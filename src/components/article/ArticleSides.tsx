/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { IArticle } from '../../../common/article'
import { articlePath } from '../../callers/articleCaller';
import { usePOST } from '../../callers/caller';
import { ELoaderStatus, ILoader, Load } from '../Load';
import SideArticleRowList from './SideArticleRowList';

interface IArticleSides{
    cutPos?: number;
    length: number;
}

export const ArticleSides: React.FC<IArticleSides> = ({cutPos = 100, length}: IArticleSides)=> {
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [articleCaller, signal] = usePOST();
    const [loader, setLoader] = useState<ILoader>({ status: ELoaderStatus.Loading });

    useEffect(()=>{
        requestArticles();
        return ()=>{
            signal.abort();
        }
    }, []);

    async function requestArticles(){
        const articles = await articleCaller({ limit: length, offset: Math.floor(Math.random() * 5) }, articlePath.selectLatestArticles);
        if(articles) {
            setArticles(articles);
            setLoader({ status: ELoaderStatus.Loaded });
        }
    }

    return (
        <Load loader={loader}>
            <SideArticleRowList articles={articles} cutPos={cutPos} />
        </Load>
    )
}

export default ArticleSides;
