import React from 'react'
import { ICast, ICastType } from '../../../common/cast';
import { replacedList } from '../../utils'
import EditCastRow from './EditCastRow'
interface IEditCastList{
    castList: ICast[];
    setCastList: (state: ICast[])=>void;
    castTypes: ICastType[];
}
export const EditCastList: React.FC<IEditCastList> = ({castList, setCastList, castTypes}: IEditCastList) => {
    function onDelete(selectedId: number){
        setCastList(castList.filter(c=> c.id !== selectedId));
    }
    function onUpdate(toUpdate: ICast){
        setCastList(replacedList(castList, castList.find(c=> c.id === toUpdate.id), toUpdate));
    }
    return (
        <div>
            {castList.map(c=> {
                return <EditCastRow key={`edit-cast-${c.id}`} onDelete={()=> { onDelete(c.id)}} cast={c} onUpdate={onUpdate} castTypes={castTypes} />
            })}
        </div>
    )
}
