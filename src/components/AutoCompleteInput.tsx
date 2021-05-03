/* eslint-disable react-hooks/exhaustive-deps */
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, Fragment, useRef} from 'react'
import AutoCompleteElement from './AutoCompleteElement';

interface IAutoCompleteInput{
    value: string;
    setValue: (s: string)=>void;
    stringList: string[];
    onSubmit: (selectedValue: string)=>void;
    requestAutoComplete: (s: string)=>any;
}

export const AutoCompleteInput: React.FC<IAutoCompleteInput> = ({value, setValue, stringList, onSubmit, requestAutoComplete}: IAutoCompleteInput)=> {
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const [selected, setSelected] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(); //to handle click outside of the component
    const [buttonClass, setButtonClass] = useState("search-btn");

    useEffect(()=>{
        addClickListener();
        return ()=>{
            removeClickListener();
        }
    }, []);

    useEffect(() => {
        if(!showAutoComplete) setSelected("");
    }, [showAutoComplete]);

    const addClickListener = ()=>{
        window.addEventListener("click", handleClickOutside);
    }

    const removeClickListener = ()=>{
        window.removeEventListener("click", handleClickOutside);
    }

    const handleClickOutside = (e)=>{
        if(wrapperRef.current != null && !wrapperRef.current.contains(e.target)){
            setShowAutoComplete(false);
        }
    }

    const onDivKeyDown = (e)=>{ //it has to be working with keystrokes, since a regular useEffect(,[keyword]) would update too frequently
        if(e.key === "Enter"){
            if(showAutoComplete) {
                if(selected !== "") {
                    onSubmit(selected);
                    setValue(selected);
                } else {
                    onSubmit(value);
                }
            } else {
                onSubmit(value);
            }
            setShowAutoComplete(false);
        }
        if(e.keyCode === 38){ //up
            if(showAutoComplete && stringList.length > 0) handleUpArrow();
        }
        if(e.keyCode === 40){ //down
            if(showAutoComplete && stringList.length > 0) handleDownArrow();
        }
        if(e.keyCode === 39){ //right
            if(showAutoComplete && stringList.length > 0 && selected !== "") {
                setValue(selected);
            }
        }
        if (e.keyCode >= 48 && e.keyCode <= 57) {
            // Number
            autoComplete(e.keyCode);
        } else if (e.keyCode >= 65 && e.keyCode <= 90) {
            // Alphabet upper case
            autoComplete(e.keyCode);
        } else if (e.keyCode >= 97 && e.keyCode <= 122) {
            // Alphabet lower case
            autoComplete(e.keyCode);
        } else if(e.keycode === 32 || e.keycode === 8 || e.keyCode === 46){ //space && backspace && delete
            setShowAutoComplete(true);
            setSelected("");
        }
    }

    const autoComplete = (keyCode: number)=>{
        setShowAutoComplete(true);
        setSelected("");
        if(value.length > 3) requestAutoComplete(value + String.fromCharCode(keyCode).toLowerCase());
    }

    const handleUpArrow = ()=>{
        if(selected === ""){
            setSelected(stringList[0]);
        } else {
            const currentIndex = stringList.indexOf(selected);
            if(currentIndex !== 0) setSelected(stringList[currentIndex-1]);
        }
    }

    const handleDownArrow = ()=>{
        if(selected === "" && stringList.length > 0){
            setSelected(stringList[0]);
        } else {
            const currentIndex = stringList.indexOf(selected);
            if(currentIndex !== stringList.length-1) setSelected(stringList[currentIndex+1]);
        }
    }

    useEffect(()=>{
        if(document.activeElement.className === "search-input"){
            setButtonClass("search-btn search-red");
        } else {
            setButtonClass("search-btn");
        }
    }, [document.activeElement]);

    return (
        <div ref={wrapperRef} className="autocomplete">
            <div className="search-grid">
                <input placeholder="Keresés" className="search-input" autoComplete="off" value={value}  onChange={(e)=>{ setValue(e.target.value); }} onKeyDown={(e)=>{ onDivKeyDown(e); }} onClick={()=>{ setShowAutoComplete(true) }} type="text" list="datalist" />
                <button className={buttonClass} onClick={()=>{ onSubmit(value); setShowAutoComplete(false); }}><FontAwesomeIcon icon={faSearch} /></button>
            </div>
            <div className="autocomplete-items">
            {showAutoComplete ? 
            (<Fragment>
                {stringList.map(s=>{
                    return <AutoCompleteElement key={`auto-${s}`} text={s} onClick={(s)=>{ setValue(s); setShowAutoComplete(false); onSubmit(s); } } selectedValue={selected} />
                })
             }
            </Fragment> ):
            (<Fragment></Fragment>)}
            </div>                        
        </div>
    )
}

export default AutoCompleteInput;
