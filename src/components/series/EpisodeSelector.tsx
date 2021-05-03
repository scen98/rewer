/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from 'react'
import { IDetailedMovie, IMovie } from '../../../common/movie';
import SideEpisodeRow from './SideEpisodeRow';
import "./seriesStyle.css"

interface IEpisodeSelector{
    episodes: IDetailedMovie[];
    onSelectedChange: (ep: IMovie) => void;
}

export const EpisodeSelector: React.FC<IEpisodeSelector> = ({episodes, onSelectedChange}: IEpisodeSelector) => {
    const [selectedEpisode, setSelectedEpisode] = useState({id: 0, title: "", releaseDate: "", casts: [], genres: [], summary: ""});
    useEffect(()=>{
        onSelectedChange(selectedEpisode);
    }, [selectedEpisode]);
    return (
        <div>
            {episodes.map(e=>{
                return <div key={`episode-select-${e.id}`} onClick={()=>{ setSelectedEpisode(e) }}><SideEpisodeRow episode={e} selectedId={selectedEpisode.id} /></div>
            })}
        </div>
    )
}
export default EpisodeSelector;