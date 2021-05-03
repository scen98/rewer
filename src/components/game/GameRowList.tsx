import React from 'react'
import { IGame } from '../../../common/game'
import { MovieRow } from '../movie/MovieRow'


interface IGameRowList{
    games: IGame[];
}

export const GameRowList: React.FC<IGameRowList> = ({games}: IGameRowList) => {
    return (
        <div>
            {games.map(m=>{
                return <MovieRow key={`movie-row-${m.id}`} movie={m} />
            })}
        </div>
    )
}

export default GameRowList;