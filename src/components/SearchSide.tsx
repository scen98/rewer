/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { usePOST } from '../callers/caller';
import { searchPath } from '../callers/search';
import { useAsyncReference } from '../hooks';
import AutoCompleteInput from './AutoCompleteInput';

export default function SearchSide() {
    const [keyword, setKeyword] = useAsyncReference("");
    const [autoList, setAutoList] = useState<string[]>([]);
    const [autoCaller, signal] = usePOST();
    const history = useHistory();

    useEffect(()=>{
        return ()=>{
            signal.abort();
        }
    }, []);

    const requestAutoComplete = async (word: string) =>{
        const newAutos = await autoCaller({ limit: 5, keyword: word }, searchPath.autoComplete);
        if(newAutos){
            setAutoList(newAutos);
        }
    }

    function search(searchParam: string){
        history.push(`/rewer/search?keyword=${searchParam}`);
    }

    return (
        <div>
             <AutoCompleteInput value={keyword.current} setValue={(s)=>{ setKeyword(s) }} onSubmit={(s)=>{ search(s)}} requestAutoComplete={(s)=>{ requestAutoComplete(s) }} stringList={autoList} />
        </div>
    )
}
