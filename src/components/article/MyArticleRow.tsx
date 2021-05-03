/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { IArticle } from '../../../common/article'
import { ESize, useCutter, useImage } from '../../hooks'
import { IModalContext, ModalContext } from '../Modal';
import EditArticle from './EditArticle';

interface IMyArticleRow{
    article: IArticle;
    onUpdate: (toUpdate: IArticle)=>void;
    onDelete: (toDlete: IArticle)=>void;
}

export const MyArticleRow: React.FC<IMyArticleRow> = ({article, onUpdate, onDelete}: IMyArticleRow)=> {
    const [imgsrc, onImgError, setImgsrc] = useImage("/rewer/uploads/articles", `${article.id}.jpg`, ESize.Medium);
    const cutPos = 300;
    const [text, isTextCut, cutText] = useCutter(article.text, cutPos);
    const [editMode, setEditMode] = useState(false);
    const { showModal } = useContext<IModalContext>(ModalContext);
    const [mainClass, setMainClass] = useState("");

    function showDeleteModal(){
        showModal(()=> { onDelete(article) }, {
            title: `Deleting article with title "${article.title}"`,
            content: <Fragment>
                        <p>If you delete this article, you will not be able to retrieve it later.</p>
                        <i>Note: if you want to hide this article from the public, consider setting its state to unpublished.</i>
                        <p>Are you sure you want to permanently delete this article?</p>
                    </Fragment>,
            acceptButton: <Fragment>Delete article</Fragment>,
            refuseButton: <Fragment>Cancel</Fragment>
        })  
    }
    useEffect(() => {
        if(!editMode) {
            cutText(article.text, cutPos); 
            setImgsrc("/rewer/uploads/articles", `${article.id}.jpg`);
            setMainClass("");
        } else {
            setMainClass("edit-article-container");
        }
    }, [editMode])
    return (
        <div className={mainClass}>
            {(!editMode)?
            (<div className="my-article-row">
                <div>
                    <img src={imgsrc} onError={onImgError} alt={`${article.title}_image`}/>
                    <button onClick={()=>{ setEditMode(true) }}>Edit</button>
                    <button onClick={showDeleteModal}>Delete</button>
                </div>            
            <div>
                <h3>{article.title}</h3>
                
                <p className="text">{text}</p>
                {(isTextCut)?
                (<Fragment><p onClick={()=> { cutText(article.text) }} className="show-more">Show more</p></Fragment>):
                (<Fragment>
                    {(article.text.length > cutPos)?
                    (<Fragment><p className="show-more" onClick={()=>{ cutText(article.text, cutPos) }}>Show less</p></Fragment>):
                    (<Fragment></Fragment>)}
                </Fragment>)
                }
                {(article.readMore.length > 0)?
                (<a href={article.readMore}>Read more</a>):
                (<Fragment></Fragment>)}
            </div>
        </div>) :
        (<Fragment>
            <EditArticle defArticle={article} onUpdate={onUpdate} />
            <button onClick={()=>{ setEditMode(false) }}>End edit</button>
        </Fragment>)}
        </div>
    )
}

export default MyArticleRow;