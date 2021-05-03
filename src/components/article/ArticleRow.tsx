import React, { Fragment } from 'react'
import { IArticle } from '../../../common/article'
import { ESize, useCutter, useImage } from '../../hooks'
import { Link } from "react-router-dom"
import "./articleStyles.css"

interface IArticleRow{
    article: IArticle;
    cutPos: number;
}

export const ArticleRow: React.FC<IArticleRow> = ({article, cutPos}: IArticleRow)=> {
    const [text, isTextCut, cutText] = useCutter(article.text, cutPos);
    const [imgsrc, onImgError] = useImage("/rewer/uploads/articles", `${article.id}.jpg`, ESize.Medium);

    return (
        <div className="article-row">
                <h3>{article.title}</h3>
                <img src={imgsrc} onError={onImgError} alt={`article_${article.title}`} /> 
                <p className="text">{text}</p>
                {(isTextCut)?
                (<Fragment><p onClick={()=> { cutText(article.text) }} className="show-more">Show more</p></Fragment>):
                (<Fragment>
                    {(article.text.length > cutPos)?
                    (<Fragment><p className="show-more" onClick={()=>{ cutText(article.text, cutPos) }}>Show less</p></Fragment>):
                    (<Fragment></Fragment>)}
                </Fragment>)
                }
                <p><Link to={`/rewer/user?userName=${article.userName}`}>By <i>{article.userName}</i></Link></p>
                {(article.readMore != null && article.readMore.length > 10)?
                (<a href={article.readMore} target="blank" >Read the full article</a>):
                (<Fragment></Fragment>)}
        </div>
    )
}

export default ArticleRow;