/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from 'react'
import { IDetailedMovie, IMovie } from '../../common/movie';
import { ISeason } from '../../common/season';
import { ISeries } from '../../common/series';
import { usePOST } from '../callers/caller';
import { getSeriesCast, seriesPath, selectDetailedSeriesPostFetch } from '../callers/seriesCaller';
import CastList from '../components/cast/CastList';
import SeriesCastRow from '../components/cast/SeriesCastRow';
import { ELoaderStatus, ILoader, Load } from '../components/Load';
import MovieInfo from '../components/movie/MovieInfo';
import { MovieRow } from '../components/movie/MovieRow';
import { EntryReviewFeed } from '../components/review/EntryReviewFeed';
import { MyReview } from '../components/review/MyReview';
import EpisodeSelector from '../components/series/EpisodeSelector';
import FeaturedSeriesSides from '../components/series/FeaturedSeriesSides';
import SeasonSelect from '../components/series/SeasonSelect';
import SeriesInfo from '../components/series/SeriesInfo';
import { getParameter } from '../urlManager';
export default function Series() {
    const [series, setSeries] = useState<ISeries>({ id: parseInt(getParameter("seriesId")), title: "Loading...", genres: [], seasons: [], summary: "", avgScore: 0 });
    const [seriesCast, setSeriesCast] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState<ISeason>({ id: 0, seriesId: parseInt(getParameter("seriesId")), episodes: [] });
    const [selectedEpisode, setSelectedEpisode] = useState<IMovie>({ id: 0, title: "", releaseDate: "", summary: "", genres: [], casts: [] });
    const [seriesCaller, seriesSignal] = usePOST({ id: series.id }, seriesPath.selectDetailedSeries);

    useEffect(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        if (series.id > 0) getSeries();
        return () => {
            seriesSignal.abort();
        }
    }, []);

    async function getSeries() {
        const selectedSeries = await seriesCaller();
        if (selectedSeries) {
            selectDetailedSeriesPostFetch(selectedSeries);
            setSeries(selectedSeries);
            setSeriesCast(getSeriesCast(selectedSeries));
            if (selectedSeries.seasons.length > 0) setSelectedSeason(selectedSeries.seasons[0]);
        }
    }

    useEffect(() => {
        if (series) document.title = `${series.title} - Rewer`;
    }, [series]);

    return (
        <Fragment>
            {window.innerWidth > 800 ?
                (
                    <div className="main-grid">
                        <div className="left-item">
                            <div className="side-container medium-side">
                                <SeasonSelect selectedSeason={selectedSeason} seasons={series.seasons} setSelectedSeason={setSelectedSeason} />
                                <EpisodeSelector episodes={selectedSeason.episodes} onSelectedChange={(e: IDetailedMovie) => { setSelectedEpisode(e) }} />
                            </div>
                            {selectedEpisode.id !== 0 ?
                                (<div className="side-container medium-side">
                                    <MyReview key={`my_review_${selectedEpisode.id}`} entry={selectedEpisode} />
                                </div>) :
                                (<Fragment></Fragment>)}

                            {selectedEpisode.casts.length > 0 ?
                                (<div className="side-container medium-side" >
                                    <h3 className="center-text">Cast</h3>
                                    <CastList casts={selectedEpisode.casts.filter(c => c.castTypeId === 4 || c.castTypeId === 5)} />
                                </div>) :
                                (<Fragment></Fragment>)}
                        </div>
                        <div className="main-item">
                            <div className="bottom-border">
                                <SeriesInfo series={series} defaultName={"Loading..."} />
                            </div>
                            {(selectedEpisode.id > 0) ?
                                (<Fragment>
                                    <MovieInfo movie={selectedEpisode} defaultName={"Loading..."} />
                                    <EntryReviewFeed entry={selectedEpisode} />
                                </Fragment>) :
                                (<p><i>No episode is selected.</i></p>)}
                        </div>
                        <div className="right-item">
                            <div className="side-container medium-side">
                                <h3 className="center-text">Cast</h3>
                                {seriesCast.filter(s => s.castTypeId > 3).map(c => {
                                    return <SeriesCastRow key={`${c.artistId}-${c.castTypeId}`} cast={c} />
                                })}
                            </div>
                            <div className="side-container large-side">
                                <FeaturedSeriesSides />
                            </div>
                        </div>
                    </div>) :
                (<div className="main-container">
                    <SeriesInfo series={series} defaultName={"Loading..."} />
                    <h3>Cast</h3>
                    {seriesCast.filter(s => s.castTypeId > 3).map(c => {
                        return <SeriesCastRow key={`${c.artistId}-${c.castTypeId}`} cast={c} />
                    })}
                    <SeasonSelect selectedSeason={selectedSeason} seasons={series.seasons} setSelectedSeason={setSelectedSeason} />
                    {selectedSeason.episodes.map(e => {
                        return <MovieRow key={`episode-${e.id}`} movie={e} />
                    })}
                </div>)}
        </Fragment>
    )
}
