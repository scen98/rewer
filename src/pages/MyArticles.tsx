/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react'
import { IArticle } from '../../common/article';
import { articlePath } from '../callers/articleCaller';
import { ECallType, usePOST } from '../callers/caller';
import { MyArticleList } from '../components/article/MyArticlesList';
import ListLoad from '../components/ListLoad';
import { MessageContext } from '../components/Messenger';
import { onEnter, useAsyncReference, useBinder, useScroll } from '../hooks'
import { replacedList } from '../utils';
const dateFormat = require("dateformat");

export default function MyArticles() {
    const [newArticle, , bindNewArticle] = useBinder({ id: 0, title: "", text: "", publishDate: null, userName: localStorage.getItem("userName"), readMore: "" });
    const [articleCaller, signal] = usePOST();
    const [articles, setArticles] = useAsyncReference([]);
    const articlePerPage = 10;
    const [addListener, removeListener] = useScroll(0.9, getMoreArticles);
    const [mainMsg, setMainMsg] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const { messenger } = useContext(MessageContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        document.title = "My Articles - Rewer";
        getMyArticles();
        return ()=>{
            signal.abort();
            removeListener();
            messenger.clear();
        }
    }, []);
    async function getMyArticles(){
        const myArticles = await articleCaller({ userName: localStorage.getItem("userName"), keyword: keyword, limit: articlePerPage, offset: 0}, articlePath.selectArticlesByUser);
        if(myArticles){
            setArticles(myArticles);
            if(myArticles.length === articlePerPage) addListener();
            if(myArticles.length === 0){
                setMainMsg("You haven't written any articles yet.");
            } else {
                setMainMsg("");
            }
        }
        setIsLoading(false);
    }

    async function getMoreArticles(){
        setIsLoading(true);
        removeListener();
        const myArticles = await articleCaller({ userName: localStorage.getItem("userName"), keyword: keyword, limit: articlePerPage, offset: articles.current.length }, articlePath.selectArticlesByUser, ECallType.SELECT);
        if(myArticles){
            setArticles([...articles.current, ...myArticles]);
            if(myArticles.length === articlePerPage) addListener();
        } else {
            setMainMsg("Server error: could not retrieve article data.");
        }
        setIsLoading(false);
    }

    async function insertArticle(){
        const newArticleCopy = { ...newArticle, text: `This article was created on ${dateFormat(new Date(), "HH:MM d.mm.yyyy")}`}
        const newId = await articleCaller(newArticleCopy, articlePath.insertArticle, ECallType.INSERT);
        if(newId){
            setArticles([{ ...newArticleCopy, id: newId }, ...articles.current ]);
            setMainMsg("");
        } else {
            messenger.addFail("Server error: could not add new article.");
        }
    }

    async function updateArticle(toUpdate: IArticle){
        const result = await articleCaller(toUpdate, articlePath.updateArticle, ECallType.ISOK);
        if(result){
            setArticles(replacedList(articles.current, articles.current.find(a=> a.id === toUpdate.id), toUpdate));
        } else {
            messenger.addFail("Server error: could not save article.")
        }
    }

    async function deleteArticle(toDelete: IArticle){
        const result = await articleCaller(toDelete, articlePath.deleteArticle, ECallType.ISOK);
        if(result){
            setArticles(articles.current.filter(a=> a.id !== toDelete.id));
        } else {
            messenger.addFail("Server error: could not delete article.");
        }
    }

    return (
        <div className="main-container">
            <div>
                <h2>Create new article</h2>
                <label>New article's title: </label>
                <input placeholder="Title" type="text" value={newArticle.title} onChange={bindNewArticle} name="title" />
                <button onClick={insertArticle}>Create</button>
                <input value={keyword} onChange={(e)=>{ setKeyword(e.target.value) }} onKeyDown={(e)=>{ onEnter(e, getMyArticles) }} type="text" placeholder="Search" />
                <button onClick={getMyArticles} >Search</button>                
            </div>
            <MyArticleList articles={articles.current} onUpdate={updateArticle} onDelete={deleteArticle} />
            <ListLoad text={mainMsg} isLoading={isLoading} />
        </div>
    )
}
