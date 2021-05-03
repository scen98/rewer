/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useContext, useEffect, useRef } from 'react'
import { IDetailedSeries, ISeries } from '../../../common/series';
import { uploadSeriesPoster } from '../../callers/seriesCaller';
import { generateEmbeddedYoutubeLink, isYoutubeLinkValid, useImage, useRatio } from '../../hooks';
import { resizeImageFn } from '../../utils';
import { MessageContext } from '../Messenger';
import "../movie/movieStyle.css";

interface IEditSeriesDetails{
    series: IDetailedSeries;
    setSeries: (s: ISeries) => void;
    bindSeries: (e)=> void;
}

export const EditSeriesDetaills: React.FC<IEditSeriesDetails> = ({series, setSeries, bindSeries}: IEditSeriesDetails) => {
    const posterInput = useRef<HTMLInputElement>();
    const [postersrc, posterError, setPosterSource] = useImage("/rewer/uploads/seriesposters", `${series.id}.jpg`);
    const { messenger } = useContext(MessageContext);
    const [frame, listenFrame, cleanFrameListener] = useRatio<HTMLIFrameElement>(0.5625);

    useEffect(()=>{
        listenFrame();

        return ()=>{
            messenger.clear();
            cleanFrameListener();
        }
    }, []);

    useEffect(()=>{
        if(isYoutubeLinkValid(series.trailer)){
            frame.current.style.display = "inline";
        } else {
            frame.current.style.display = "none";
        }
    }, [series.trailer]);

    async function savePoster(){
        const formData = new FormData();
        if(!posterInput.current.files[0]){
            messenger.addWarning("No file is selected.", 5000);
            return;
        }
        const resizedFile = await resizeImageFn(posterInput.current.files[0], 400, 600, 0.8);
        formData.append("poster", resizedFile, `${series.id}.jpg`);
        if(await uploadSeriesPoster(formData)){
            setPosterSource(`/rewer/uploads/seriesposters`, `${series.id}.jpg?${new Date().getTime()}`);
        } else {
            messenger.addFail("Server error: upload unsuccessful.");
        }
    }

    return (
        <Fragment>
        <div className="detail-grid">
            <div className="span-2">
                <input value={series.title} onChange={bindSeries} name="title" type="text" placeholder="Title" className="title-input" /><br/>
                <textarea value={series.summary} onChange={bindSeries} name="summary" placeholder="Write something about the story..." rows={20} />
            </div>
            <div>
                <img src={postersrc} onError={posterError} alt="Poster" title="Poster" className="edit-poster"/>
                {(series.id > 0)? 
                (<Fragment>
                    <p>It is recommended to use an image with a standard poster image ratio</p>
                    <input ref={posterInput} type="file" accept=".png,.jpg,.jpeg" className="file-input" />
                    <button onClick={savePoster}>Upload</button>
                </Fragment>):
                (<Fragment>
                    <p>Create the series' page to edit this picture.</p>
                </Fragment>)}
            </div>
        </div>
        <div className="divider" />
        <label>Trailer:</label>
        <input className="wide-input" value={series.trailer} onChange={bindSeries} type="text" name="trailer" placeholder="Paste a youtube link here"  />
        <iframe className="trailer" ref={frame} title="Youtube trailer" src={generateEmbeddedYoutubeLink(series.trailer)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    </Fragment>)
}

export default EditSeriesDetaills;