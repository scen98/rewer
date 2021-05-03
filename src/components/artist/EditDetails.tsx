/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useRef, useContext } from 'react'
import { IArtist } from '../../../common/artist';
import { artistPath } from '../../callers/artistCaller';
import { uploadCaller } from '../../callers/caller';
import { parseForInput } from '../../dateParser';
import { useImage } from '../../hooks';
import { resizeImageFn } from '../../utils';
import { MessageContext } from '../Messenger';
import "./artistStyle.css";

interface IEditDetails{
    artist: IArtist;
    setArtist: (artist: IArtist) => void;
    bindArtist: (e) => void;
}

export const EditDetails: React.FC<IEditDetails> = ({artist, setArtist, bindArtist}: IEditDetails) => {
    const imageInput = useRef<HTMLInputElement>();
    const [portraitSource, onError, setPortraitSource] = useImage("/rewer/uploads/portraits", `${artist.id}.jpg`);
    const [uploader, signal] = uploadCaller(artistPath.uploadPortrait, undefined);
    const { messenger } = useContext(MessageContext);

    useEffect(()=>{
        return ()=>{
            signal.abort();
            messenger.clear();
        }
    }, []);

    async function uploadImage(){
        const formData = new FormData();
        if(!imageInput.current.files[0]){
            messenger.addWarning("No file was chosen.");
            return;
        }
        const resizedFile = await resizeImageFn(imageInput.current.files[0], 400, 600, 0.8);
        formData.append("portrait", resizedFile, `${artist.id}.jpg`);
        if(await uploader(artistPath.uploadPortrait, formData)){
            setPortraitSource(`/rewer/uploads/portraits`, `${artist.id}.jpg?${new Date().getTime()}`);
            messenger.addSuccess("Portrait updated.", 3000);
        } else {
            messenger.addWarning("Upload unsuccessful.");
        }
    }
    return (
        <div>
            <input value={artist.name} onChange={bindArtist} type="text" name="name" placeholder="Name" className="name-input" />
            <div className="detail-grid">
                <div className="detail-grid-item span-2">
                    <h3>Born: </h3>
                    <input value={artist.birthPlace} type="text" onChange={bindArtist} name="birthPlace" className="place-input" placeholder="Birthplace"/>
                    <input value={parseForInput(new Date(artist.birthDate))} type="date" onChange={bindArtist} name="birthDate" /><br/>
                    <h3>Died: </h3>
                    <input value={artist.deathPlace} type="text" onChange={bindArtist} name="deathPlace" className="place-input" placeholder="leave empty if irrelevant" title="leave empty if irrelevant"/>
                    <input value={parseForInput(new Date(artist.deathDate)).toString()} type="date" onChange={bindArtist} name="deathDate" />
                    <textarea value={artist.bio} onChange={bindArtist} name="bio" placeholder="Biography" rows={30} />
                </div>
                <div className="detail-grid-item first" >
                    <img className="portrait" src={portraitSource} onError={onError} alt="Portrait" /><br />
                    {(artist.id > 0)?
                    (<Fragment>
                        <input ref={imageInput} type="file" accept=".png,.jpg" className="file-input" />
                        <p>It is recommended to use pictures with the standard portrait image ratio (9:16)</p>
                        <button onClick={uploadImage}>Upload</button>
                    </Fragment>):
                    (<Fragment>
                        <p>Create the artist's page to modify their portrait.</p>
                    </Fragment>)}
                </div>
            </div>
            
            
        </div>
    )
}

export default EditDetails;