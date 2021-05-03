import React from 'react'
import { ISeason } from '../../../common/season'

interface ISeasonSelect{
    selectedSeason: ISeason;
    setSelectedSeason: (s: ISeason) => void;
    seasons: ISeason[];
}

export const SeasonSelect: React.FC<ISeasonSelect> = ({selectedSeason, setSelectedSeason, seasons}: ISeasonSelect) => {
    return (
       <select value={selectedSeason.id.toString()} onChange={(e)=> { setSelectedSeason(seasons.find(s=> s.id === parseInt(e.target.value))) }}>
           {seasons.map(s=> {
               return <option key={s.id} value={s.id.toString()}>Season {s.order}</option>
           })}
       </select>
    )
}
export default SeasonSelect;