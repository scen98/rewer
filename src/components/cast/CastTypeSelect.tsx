/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import { ICastType } from '../../../common/cast';

interface ICastTypeSelect{
    typeList: ICastType[];
    updateValue: (selectedValue: string)=>void;
    initialValue?: string;
}

export const CastTypeSelect: React.FC<ICastTypeSelect> = ({typeList, updateValue, initialValue = null}: ICastTypeSelect)=>{
    const select = useRef<HTMLSelectElement>();
    function updateSelected(){
        updateValue(select.current.value);
    }
    useEffect(()=>{
        if(initialValue != null){
            select.current.value = initialValue;
        }
    },[]);
    
    return (
        <select ref={select} onChange={updateSelected}>
            {typeList.map(t=> {
            return <option key={`castType_${t.value}`} value={t.value}>{t.name}</option>
        })}
        </select>
       
    )
}
export default CastTypeSelect;
