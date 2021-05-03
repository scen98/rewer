import { faCheckSquare, faExclamationTriangle, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { createContext, Fragment } from 'react'
import "../App.css";

export enum EMessageType{
    Success = "success",
    Fail = "fail",
    Warning = "warning"
}

export interface IMessage{
    content: string;
    type?: EMessageType; //megjelenő ikon típusa
    time?: number; //milisec
}

export interface IMessageContext {
    messenger: IMessenger;
}

export interface IMessenger {
    addSuccess: (text: string, time?: number | null)=>void;
    addWarning: (text: string, time?: number | null)=>void;
    addFail: (text: string, time?: number | null)=>void;
    clear: ()=>void;
}

export const MessageContext = createContext<IMessageContext>(null);

export const MessageProvider: React.FC<React.ReactNode> = ({children})=>{
    const [messages, setMessages] = React.useState<IMessage[]>([]);

    const showMessage = (newMessage: IMessage)=>{
        const msg = { 
            ...newMessage, 
            type: newMessage.type
        };
        setMessages([ ...messages, msg ]);
        if(newMessage.time != null){
            setTimeout(()=>{
                setMessages(oldMsgs => [...oldMsgs.filter(o=> o.content !== newMessage.content)]);
            }, newMessage.time);
        }
    }

    const getIcon = (message: IMessage)=>{
        if(message.type === EMessageType.Success){
            return <FontAwesomeIcon className="msg-icon msg-success" icon={faCheckSquare} />
        } else if(message.type === EMessageType.Warning){
            return <FontAwesomeIcon className="msg-icon msg-warning" icon={faExclamationTriangle} />
        } else {
            return <FontAwesomeIcon className="msg-icon msg-fail" icon={faTimesCircle} />
        }
    }

    const messenger: IMessenger = {
        addSuccess: (content: string, time: number = null)=>{
            showMessage({ content: content, time: time, type: EMessageType.Success });
        },
        addWarning: (content: string, time: number = null)=>{
            showMessage({ content: content, time: time, type: EMessageType.Warning });
        },
        addFail: (content: string, time: number = null)=>{
            showMessage({ content: content, time: time, type: EMessageType.Fail });
        },
        clear: ()=> { setMessages([]); }
    }

    const state = {
        messenger: messenger
    }

    return (
        <MessageContext.Provider value={state} >
            <div className="message-box">
                {messages.map(m=>{
                    return (<div key={`msg-${Math.random()}`} className="message-row">
                        {getIcon(m)}
                        <span className="msg-content">{m.content}</span>
                        {m ===  messages[0] ?
                        (<span onClick={()=>{ setMessages([]); }}><FontAwesomeIcon className="msg-close" icon={faTimes} /></span>):
                        (<Fragment></Fragment>)}
                        
                    </div>)
                })}
            </div>
            {children}
        </MessageContext.Provider>
    )
}
