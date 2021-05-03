import React, { Fragment } from 'react'
import { IArticle } from '../../../common/article'
import SideArticleRow from './SideArticleRow'

interface ISideArticleRowList{
    articles: IArticle[];
    cutPos: number;
}

export const SideArticleRowList: React.FC<ISideArticleRowList> = ({articles, cutPos}: ISideArticleRowList)=> {
    return (
        <Fragment>
            {articles.map(a=>{
                return <SideArticleRow key={`side-article-${a.id}`} article={a} cutPos={cutPos} />
            })}
        </Fragment>
    )
}

export default SideArticleRowList;