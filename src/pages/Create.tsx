import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { faFilm, faTv, faUserFriends, faNewspaper, faGamepad } from "@fortawesome/free-solid-svg-icons"
export default function Create() {
    useEffect(()=>{
        document.title = "New - Rewer";
    }, []);
    return (
        <div className="main-container">            
            <Link to="/rewer/editmovie?movieId=0" >
                <div className="new-link">
                    <p><FontAwesomeIcon icon={faFilm} />Movie</p>
                </div>
            </Link>      
            <Link to="/rewer/editseries?seriesId=0" className="new-link">
                <div className="new-link">
                    <p><FontAwesomeIcon icon={faTv} />Series</p>
                </div>
            </Link>
            <Link to="/rewer/editgame?gameId=0" className="new-link">
                <div className="new-link">
                    <p><FontAwesomeIcon icon={faGamepad} />Videogame</p>
                </div>
            </Link>    
            <Link to="/rewer/editartist?artistId=0" className="new-link">
                <div className="new-link">
                    <p><FontAwesomeIcon icon={faUserFriends} />Person</p>
                </div>
            </Link>     
            <Link to="/rewer/myarticles" className="new-link">
                <div className="new-link">
                    <p><FontAwesomeIcon icon={faNewspaper} />Article</p>
                </div>
            </Link>                         
        </div>
    )
}
