import React, { createContext, useEffect, useState, useRef, Fragment } from 'react'
import "../main.css";

export interface IModalContext {
    showModal:  (newCallback: ()=>void, customModal?: IModal)=>void;
    setModalVisibility?: (isVisible: boolean)=>void;
}

export interface IModal{
    title: string;
    content?: JSX.Element;
    acceptButton?: JSX.Element;
    refuseButton?: JSX.Element;
}

export const ModalContext = createContext<IModalContext>(null);

export const ModalProvider: React.FC<React.ReactNode> = ({children}) => {
    const modalRef = useRef<HTMLDivElement>();
    const [title, setTitle] = useState<string>("Are you sure?");
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);
    const [content, setContent] = useState(<Fragment></Fragment>);
    const [acceptBtn, setAcceptBtn] = useState<any>();
    const [refuseBtn, setRefuseBtn] = useState<any>();
    const callback = useRef<()=>void>();

    const showModal = (newCallback: ()=>void, customModal?: IModal)=>{
        if(customModal){
            setTitle(customModal.title);
            setContent(customModal.content);
            setAcceptBtn(customModal.acceptButton);
            setRefuseBtn(customModal.refuseButton);
        } else {
            setTitle("Are you sure?");
            setContent(<Fragment></Fragment>);
            setAcceptBtn(<Fragment>Accept</Fragment>);
            setRefuseBtn(<Fragment>Cancel</Fragment>);
        }
        callback.current = ()=>{ newCallback(); }
        setModalVisibility(true);
        window.addEventListener("mousedown", clickListener);
    }

    const clickListener = (event) =>{
        if(event.target === modalRef.current){
            setModalVisibility(false);
            window.removeEventListener("mousedown", clickListener);
        }
    }

    const acceptCommand = ()=>{
        callback.current();
        setModalVisibility(false);
    }

    const refuseCommand = () => {
        setModalVisibility(false);
    }

    useEffect(()=>{
        if(modalVisibility){
            modalRef.current.style.display = "block";
        } else {
            modalRef.current.style.display = "none";
        }
    }, [modalVisibility]);

    const state = {
        showModal: showModal,
        setModalVisibility: setModalVisibility
    }

    return (
        <ModalContext.Provider value={state}>
            {children}
            <div ref={modalRef} className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                    <span onClick={refuseCommand} className="close">&times;</span>
                    <h2>{title}</h2>
                    </div>
                    <div className="modal-body">
                        {content}
                    </div>
                    <div className="modal-footer">
                        <button onClick={acceptCommand}>{acceptBtn}</button>
                        <button onClick={refuseCommand}>{refuseBtn}</button>
                    </div>
                </div>
            </div>
        </ModalContext.Provider>   
    )
}

export default ModalProvider;