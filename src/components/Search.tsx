/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { IFilter } from '../../common/search';
import { usePOST } from '../callers/caller';
import { searchPath } from '../callers/search';
import { useAsyncReference } from '../hooks';
import { changeParam, getParameter } from '../urlManager';
import ArticleRowList from './article/ArticleRowList';
import ArtistRowList from './artist/ArtistRowList';
import ArtistSelector from './artist/ArtistSelector';
import AutoCompleteInput from './AutoCompleteInput';
import GameRowList from './game/GameRowList';
import ListLoad from './ListLoad';
import { MovieRowList } from './movie/MovieRowList';
import UserRowList from './profile/UserRowList';
import { SeriesRowList } from './series/SeriesRowList';

export default function Search() {
    const [results, setResults] = useState({movies: [], games: [], series: [], artists: [], users: [], articles: []});
    const [keyword, setKeyword] = useAsyncReference(getParameter("keyword"));
    const [filters, setFilters] = useState<IFilter>({ movies: true, games: true, series: true, artists: true, articles: true, users: true });
    const [searcher, signal] = usePOST();
    const [autoList, setAutoList] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mainMsg, setMainMsg] = useState("");

    useEffect(()=>{
        fetchResults(keyword.current);
        return ()=>{
            signal.abort();
        }
    }, []);

    async function fetchResults(word: string){
        setResults({movies: [], games: [], series: [], artists: [], users: [], articles: []});
        setIsLoading(true);
        const result = await searcher({ keyword: word, filter: filters }, searchPath.search);
        if(result){
            setResults(result);
            document.title = `Search: ${word} - Rewer`;   
        } else {
            setMainMsg("Server error: could not download data.");
        }
        const searchCount = result.movies.length + result.games.length + result.artists.length + result.users.length + result.articles.length;
        if(searchCount === 0) {
            setMainMsg("No results were found.");
        } else {
            setMainMsg("");
        }
        changeParam({name: "keyword", value: word });
        setIsLoading(false);
    }

    function changeAllFilters(newValue: boolean){
        const newF = filters;
        for(const prop in newF) {
            newF[prop] = newValue;
        }
        setFilters({ ...newF }); //*__*
    }

    async function requestAutoComplete(word: string){
        if(word.length > 3){
            const auto = await searcher({ keyword: word, limit: 5, filter: filters }, searchPath.autoComplete);         
            if(auto){
                setAutoList(auto);
            }
        } else {
            setAutoList([]);
        }
    }
    
    return (
        <div>
            <AutoCompleteInput value={keyword.current} setValue={(s)=>{ setKeyword(s) }} stringList={autoList} onSubmit={(s)=>{ fetchResults(s) }} requestAutoComplete={(s: string)=>{ requestAutoComplete(s) }} />
            <h3>Include: </h3>
            <label>Movies:</label>
            <input checked={filters.movies} name="movies" type="checkbox" onChange={()=>{ setFilters({ ...filters, movies: !filters.movies }) }} className="search-cb" />
            <label>Games:</label>
            <input checked={filters.games} name="games" type="checkbox" onChange={()=>{ setFilters({ ...filters, games: !filters.games }) }} className="search-cb" />
            <label>Series:</label>
            <input checked={filters.series} name="series" type="checkbox" onChange={()=>{ setFilters({ ...filters, series: !filters.series }) }} className="search-cb" />
            <label>Artists:</label>
            <input checked={filters.artists} name="artists" type="checkbox" onChange={()=>{ setFilters({ ...filters, artists: !filters.artists })} } className="search-cb" />
            <label>Articles:</label>
            <input checked={filters.articles} name="articles" type="checkbox" onChange={()=>{ setFilters({ ...filters, articles: !filters.articles })} } className="search-cb" />
            <label>Users:</label>
            <input checked={filters.users} name="users" type="checkbox" onChange={()=>{ setFilters({ ...filters, users: !filters.users })} } className="search-cb" /><br/>
            <button onClick={()=>{ changeAllFilters(true) }}>All</button>
            <button onClick={()=>{ changeAllFilters(false) }}>Clear</button>
            <ListLoad isLoading={isLoading} text={mainMsg} />
            <MovieRowList movies={results.movies} />
            <GameRowList games={results.games} />
            <SeriesRowList series={results.series} />
            <ArtistRowList artists={results.artists} />
            <UserRowList users={results.users} />
            <ArticleRowList articles={results.articles} cutPos={150} />
        </div>
    )
}
