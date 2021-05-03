import React, { Fragment } from 'react'
import { IArticle } from '../../../common/article';
import { ESize, useCutter, useImage } from '../../hooks';
import "./articleStyles.css";

interface ISideArticleRow{
    article: IArticle;
    cutPos: number;
}

export const SideArticleRow: React.FC<ISideArticleRow> = ({article, cutPos}: ISideArticleRow)=> {
    const [imgsrc, imgError] = useImage("/rewer/uploads/articles", `${article.id}.jpg`, ESize.Normal);
    const [text, isTextCut, cutText] = useCutter(article.text, cutPos);
    return (
        <div className="article-side-row">
            <img src={imgsrc} onError={imgError} alt={`${article.title}`}  />
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
            {(article.readMore != null && article.readMore.length > 10)?
            (<a href={article.readMore} target="blank" >Full article</a>):
            (<Fragment></Fragment>)}
        </div>
    )
}

export default SideArticleRow;