/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import "./articleStyles.css";
import { IArticle } from "../../../common/article";
import { useBinder, useImage } from '../../hooks';
import { resizeImageFn } from '../../utils';
import { uploadArticleImage } from '../../callers/articleCaller';
import { MessageContext } from '../Messenger';
const dateFormat = require("dateformat");

interface IEditArticle{
    defArticle: IArticle;
    onUpdate: (article: IArticle)=>void;
}

export const EditArticle: React.FC<IEditArticle> = ({defArticle, onUpdate})=> {
    const [article, setArticle, bindArticle] = useBinder(defArticle);
    const [isPublished, setIsPublished] = useState(false);
    const [imgsrc, imgError, setImgsrc] = useImage("/rewer/uploads/articles", `${article.id}.jpg`);
    const fileInput = useRef<HTMLInputElement>();
    const { messenger } = useContext(MessageContext);

    function updateArticle(){
        onUpdate(article);
        messenger.addSuccess("Changes saved.", 3000);
    }

    useEffect(() => {
        if(defArticle.publishDate != null){
            setIsPublished(true);
        }
        return ()=>{
            messenger.clear();
        }
    }, []);

    function setPublished(){
        if(isPublished){
            setArticle({ ...article, publishDate: null });
        } else {
            setArticle( { ...article, publishDate: new Date().toISOString() });
        }
        setIsPublished(!isPublished);
    }

    async function uploadImage(){
        const formData = new FormData();
        if(fileInput.current.files.length < 1){
            messenger.addWarning("Not file was chosen.");
            return;
        }
        const resizedFile = await resizeImageFn(fileInput.current.files[0], 400, 600, 0.9);
        formData.append("image", resizedFile, `${article.id}.jpg`);
        if(await uploadArticleImage(formData)){
            setImgsrc( "/rewer/uploads/articles", `${article.id}.jpg?${new Date().getTime()}`);
        } else {
            messenger.addFail("Server error: could not upload image.");
        }
    }

    return (
        <div>
            <div className="edit-article-grid">
                <div>
                    <img src={imgsrc} onError={imgError} alt="article_image" />
                    <input ref={fileInput} className="article-img-input" type="file" accept=".png,.jpg,.jpeg" />
                    <button onClick={uploadImage}>Upload</button>
                </div>
                <div>
                    <label>Title</label>
                    <input value={article.title} name="title" onChange={bindArticle} placeholder="title" />
                    <textarea className="edit-article-content" name="text" value={article.text} onChange={bindArticle} rows={10} placeholder="short news"/><br/>
                    <label>Publish: </label>
                    <input type="checkbox" checked={isPublished} onChange={()=>{ setPublished() }}/>
                    {(isPublished)?
                    ( <input value={dateFormat(new Date(article.publishDate), "yyyy-mm-dd") + "T" + dateFormat(new Date(article.publishDate), "HH:MM")} onChange={(e)=>{ setArticle({...article, publishDate: e.target.value }) }} type="datetime-local" />):
                    (<Fragment></Fragment>)} <br/>
                    <label>Read more link: </label>
                    <input name="readMore" type="text" value={article.readMore} onChange={bindArticle} placeholder="Leave empty if irrelevant" />
                    <button onClick={()=>{ updateArticle() }}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditArticle;
