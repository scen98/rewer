/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react'
import { useRatio, generateEmbeddedYoutubeLink, isYoutubeLinkValid } from '../../hooks';

interface ITrailer{
    url: string;
}

export const Trailer: React.FC<ITrailer> = ({url}: ITrailer)=> {
    const [frame, listenFrame, cleanFrameListener] = useRatio<HTMLIFrameElement>(0.5625);
    useEffect(() => {
        listenFrame();
        return () => {
            cleanFrameListener();
        }
    }, []);

    useEffect(() => {
        if(isYoutubeLinkValid(url)){
            frame.current.style.display = "inline";
        } else {
            frame.current.style.display = "none";
        }
    }, [url]);

    return (
        <Fragment>
            <iframe ref={frame} className="trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="trailer" src={generateEmbeddedYoutubeLink(url)}  />
        </Fragment>
    )
}

export default Trailer;