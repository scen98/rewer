/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, Fragment } from 'react'
import "./headerStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faSignInAlt, faNewspaper, faUserFriends, faPenFancy, faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons'
import { HeaderItem } from './HeaderItem';
import { faHotjar } from '@fortawesome/free-brands-svg-icons';

interface IHeader{
    permissionLevel: number;
}

export const Header: React.FC<IHeader> = ({ permissionLevel }: IHeader)=> {
    const headerRef = useRef<HTMLDivElement>(null);

    function displayMenu(){
        if(!headerRef.current.classList.contains("responsive")){
            headerRef.current.classList.add("responsive");
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        } else {
            headerRef.current.classList.remove("responsive");
        }
    }

    useEffect(()=>{
        console.log(localStorage.getItem("userName"));
        console.log(localStorage.getItem("nickName"));
        console.log(localStorage.getItem("session"));
        console.log(localStorage.getItem("permission"));
    }, []);

    function closeHeader(){
        setTimeout(()=>{
            headerRef.current.classList.remove("responsive");
        }, 250); //not sure why anymore
    }

    useEffect(()=>{
        console.log(permissionLevel);
    }, [permissionLevel])

    return ( //it has to be a link cuz yea        
           <header>
                <div ref={headerRef} className="topnav sticky">
                    <div onClick={closeHeader}>
                    {permissionLevel > 0 ?
                    (<Fragment>
                        <HeaderItem to="/rewer/profile" content={<FontAwesomeIcon icon={faUser} />} />
                        <HeaderItem to="/rewer/home" content={<Fragment><FontAwesomeIcon icon={faHotjar} /><span>Fresh</span></Fragment>} />
                        <HeaderItem to={"/rewer/follows"} content={<Fragment><FontAwesomeIcon icon={faUserFriends} /><span>Follows</span></Fragment>} />
                    </Fragment>):
                    (<Fragment>
                        <HeaderItem to="/rewer/profile" content={<FontAwesomeIcon icon={faSignInAlt} />} />
                        <HeaderItem to="/rewer/home" content={<Fragment><FontAwesomeIcon icon={faHotjar} /><span>Fresh</span></Fragment>} />
                    </Fragment>)}                                                    
                    <HeaderItem to="/rewer/news" content={<Fragment><FontAwesomeIcon icon={faNewspaper} /><span>News</span></Fragment>} />                              
                    {(permissionLevel > 1) ?
                    (<Fragment>
                        <HeaderItem to="/rewer/myarticles" content={<Fragment><FontAwesomeIcon icon={faPenFancy} /><span>My Articles</span></Fragment>} />
                        <HeaderItem to="/rewer/create" content={<Fragment><FontAwesomeIcon icon={faPlusSquare} /><span>Create</span></Fragment>} />
                    </Fragment>):
                    (<Fragment></Fragment>)}
                    </div>
                    <a onClick={displayMenu} className="icon">
                        <FontAwesomeIcon icon={faBars} />
                    </a>
                </div>
            </header>
    )
}
export default Header;
