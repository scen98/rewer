import React from 'react'
import { ICast } from '../../../common/cast';
import { compareCastType } from '../../callers/castCaller';
import CastRow from './CastRow';

interface ICastList{
    casts: ICast[];
}

export const CastList: React.FC<ICastList> = ({casts}: ICastList) => {
    return (
        <div>
            {casts.sort(compareCastType).map(c=> {
                return <CastRow key={`cast-${c.id}`} cast={c} />
            })}
        </div>
    )
}

export default CastList;