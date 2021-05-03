import React from 'react'
import { IArticle } from '../../../common/article'
import ArticleRow from './ArticleRow'

interface IArticleRowList{
    articles: IArticle[];
    cutPos: number;
}

export const ArticleRowList: React.FC<IArticleRowList> = ({articles, cutPos}: IArticleRowList)=> {
    return (
        <div>
            {articles.map(a=>{
                return <ArticleRow key={`article-row-${a.id}`} article={a} cutPos={cutPos} />
            })}
        </div>
    )
}

export default ArticleRowList;