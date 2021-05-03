import React from 'react'
import { IArticle } from '../../../common/article'
import MyArticleRow from './MyArticleRow'

interface IMyArticlesList{
    articles: IArticle[];
    onUpdate: (toUpdate: IArticle)=>void;
    onDelete: (toDelete: IArticle)=>void;
}

export const MyArticleList: React.FC<IMyArticlesList> = ({articles, onUpdate, onDelete}: IMyArticlesList)=> {
    return (
        <div>
            {articles.map(a=>{
                return <MyArticleRow article={a} onUpdate={onUpdate} onDelete={onDelete} key={`my-article-${a.id}`}/>
            })}
        </div>
    )
}
