/* eslint-disable react-hooks/exhaustive-deps */
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useContext, Fragment } from 'react'
import { IArtist } from '../../common/artist'
import { artistPath } from '../callers/artistCaller'
import { ECallType, usePOST } from '../callers/caller'
import EditDetails from '../components/artist/EditDetails'
import { MessageContext } from '../components/Messenger'
import { ModalContext } from '../components/Modal'
import { useBinder } from '../hooks'
import { changeParam, getParameter } from '../urlManager'

export default function EditArtist() {
    const [artist, setArtist, bindArtist] = useBinder<IArtist>({id: parseInt(getParameter("artistId")), name: "", birthPlace: "", birthDate: "", deathPlace: "", deathDate: "", bio: ""})
    const [artistCaller, artistSignal] = usePOST({ id: artist.id }, artistPath.selectDetailedArtist);
    const { messenger } = useContext(MessageContext);
    useEffect(()=>{
        if(artist.id > 0){
            getArtist();
        }

        return ()=>{
            artistSignal.abort();
            messenger.clear();
        }
    }, []);
    const { showModal } = useContext(ModalContext);
    
    useEffect(()=>{
        if(artist) document.title = `(Edit) ${artist.name} - Rewer`;
    }, [artist]);

    async function getArtist(){
        const selectedArtist = await artistCaller();
        if(selectedArtist){
            setArtist(selectedArtist);
        }
    }

    async function createArtist(){
        const newId = await artistCaller(artist, artistPath.insertArtist, ECallType.INSERT);
        if(newId){
            messenger.addSuccess("Artist's page successfully created.", 5000);
            changeParam({name: "artistId", value: newId.toString()});
            setArtist({...artist, id: newId});
        } else{
            messenger.addFail("Internal error: the server was unable to fulfill your request.");
        } 
    }

    async function saveArtist(){
        if(await artistCaller(artist, artistPath.updateArtist, ECallType.ISOK)){
            messenger.addSuccess(`Changes saved.`, 5000);
        } else {
            messenger.addFail("Internal error: the server was unable to save changes.")
        }        
    }

    async function deleteArtist(){
        const success = await artistCaller({ id: artist.id }, artistPath.deleteArtist, ECallType.ISOK);
        if(success){
            const name = artist.name;
            messenger.addWarning(`Artist "${name}" was permanently deleted.`);
            setArtist({ id: 0, name: "", birthPlace: "", birthDate: "", deathPlace: "", deathDate: "", bio: "" });
            changeParam({ name: "gameId", value: "0" });
        } else {
            messenger.addWarning("Server error: unable to delete artist's page.");
        }
    }

    function onDelete(){
        showModal(()=>{
            deleteArtist();
        }, {
            title: `Deleting game`,
            acceptButton: <Fragment>Delete</Fragment>,
            refuseButton: <Fragment>Cancel</Fragment>,
            content: <p>
                If you delete this game, you won't be able to recover its content later. All reviews written for this game will be also deleted permanantly.
                Are you sure you want to proceed?
            </p>
        })
    }

    return (
        <div className="main-container">
            <br/>
            <div className="adder-panel">      
            {(artist.id > 0)? 
            (<Fragment>
                <button onClick={saveArtist}><FontAwesomeIcon icon={faSave} />Save</button>
                <button onClick={onDelete}><FontAwesomeIcon icon={faTrash} />Delete</button>
            </Fragment>): 
            (<button onClick={createArtist}>Create artist's page</button>)}
             </div>
            <EditDetails artist={artist} setArtist={setArtist} bindArtist={bindArtist} />
        </div>
    )
}