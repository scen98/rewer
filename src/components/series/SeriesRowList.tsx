import React from 'react'
import { IPreviewSeries } from '../../../common/series'
import SeriesRow from './SeriesRow'

interface ISeriesRowList{
    series: IPreviewSeries[];
}

export const SeriesRowList: React.FC<ISeriesRowList> = ({series}: ISeriesRowList) => {
    return (
        <div>
            {series.map(s=>{
                return <SeriesRow key={`series-row-${s.id}`} series={s} />
            })}
        </div>
    )
}
