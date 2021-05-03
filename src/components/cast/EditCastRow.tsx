/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import CastTypeSelect from './CastTypeSelect'
import "./castStyle.css";
import { ESize, useAsyncBinder, useImage } from '../../hooks'
import { ICast, ICastType } from '../../../common/cast';
import { castPath } from '../../callers/castCaller';
import { ECallType, usePOST } from '../../callers/caller';
import { MessageContext } from '../Messenger';

interface IEditCastRow{
    cast: ICast;
    castTypes: ICastType[];
    onDelete: ()=>void;
    onUpdate: (updated: ICast)=>void;
}

export const EditCastRow: React.FC<IEditCastRow> = ({cast, castTypes, onDelete, onUpdate}: IEditCastRow) => {
    const [mainClass, setMainClass] = useState("edit-cast-row-container");
    const [getCast, setCast, castBinder] = useAsyncBinder(cast);
    const [caller, signal] = usePOST();
    const [imgsrc, onImgError] = useImage("/rewer/uploads/portraits", `${getCast.current.artistId}.jpg`, ESize.Small);
    const { messenger } = useContext(MessageContext);

    useEffect(() => {
        return ()=>{
            signal.abort();
        }
    }, []);
    
    async function deleteRow(){
        if(await caller({ id: cast.id}, castPath.deleteCast, ECallType.ISOK)){
            onDelete();
        }else {
            messenger.addFail("Server error: could not delete chosen cast row.");
        }
    }

    async function saveChanges(){
        if(await caller(getCast.current, castPath.updateCast, ECallType.ISOK)){
            onUpdate(getCast.current); 
            saved();
        } else {
            messenger.addFail("Server error: could not save changes.");
        }
    }

    const setCastTypeId = (newTypeId: string) =>{
        setCast({...getCast.current, castTypeId: parseInt(newTypeId)});
    }

    const setUnsaved = ()=>{ 
        if(!mainClass.includes("unsaved")){
            setMainClass(mainClass + " unsaved");
        }
    }

    const saved = ()=>{
        if(mainClass.includes("unsaved")){
            setMainClass(mainClass.replace(" unsaved", ""));
        }
    }

    return (
        <div className={mainClass}>
        {window.screen.width > 600 ?
        (<div className="edit-cast-row">
            <img src={imgsrc} onError={onImgError} alt={cast.artistName} />
            <p>{getCast.current.artistName}</p>
            <input name="name" value={getCast.current.name} onChange={(e)=>{ castBinder(e); setUnsaved(); } } />
            <CastTypeSelect typeList={castTypes} initialValue={getCast.current.castTypeId.toString()} updateValue={(newTypeId: string)=>{ setCastTypeId(newTypeId); setUnsaved();} } />
            <button onClick={saveChanges} >Update</button>
            <button onClick={deleteRow}>Delete</button>
        </div>) :
        ( <div>
            <div className="edit-cast-row-mobile-row-1">
                <img src={imgsrc} onError={onImgError} alt={cast.artistName} />
                <p>{getCast.current.artistName}</p>            
            </div>
            <input className="mobile-cast-input" placeholder="Empty" name="name" value={getCast.current.name} onChange={(e)=>{ castBinder(e); setUnsaved(); } } />
            <div  className="edit-cast-row-mobile-row-2">
                <CastTypeSelect typeList={castTypes} initialValue={getCast.current.castTypeId.toString()} updateValue={(newTypeId: string)=>{ setCastTypeId(newTypeId); setUnsaved();} } />
                <button onClick={saveChanges} >Update</button>
                <button onClick={deleteRow}>Delete</button>
            </div>
        </div>)}
        </div>         
    )
}

export default EditCastRow;
