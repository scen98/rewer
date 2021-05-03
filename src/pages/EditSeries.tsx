/* eslint-disable react-hooks/exhaustive-deps */
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useContext, Fragment} from 'react'
import { IGenre, ISeriesGenre } from '../../common/genre';
import { ISeason } from '../../common/season';
import { IDetailedSeries } from '../../common/series';
import { ECallType, usePOST } from '../callers/caller';
import { seriesPath } from '../callers/seriesCaller';
import { MessageContext } from '../components/Messenger';
import { ModalContext } from '../components/Modal';
import GenreAdder from '../components/movie/GenreAdder';
import EditSeasons from '../components/series/EditSeasons';
import EditSeriesDetaills from '../components/series/EditSeriesDetails';
import { useBinder } from '../hooks';
import { changeParam, getParameter } from '../urlManager'

export default function EditSeries() {
    const [series, setSeries, bindSeries] = useBinder<IDetailedSeries>({id: parseInt(getParameter("seriesId")), title: "", summary: "", seasons: [], genres: [], avgScore: 0 });
    const [caller, signal] = usePOST();
    const { messenger } = useContext(MessageContext);
    const { showModal } = useContext(ModalContext);

    useEffect(()=>{
        if(series.id > 0){
            getSeries();
        }
        return ()=>{
            signal.abort();
            messenger.clear();
        }
    }, []);

    useEffect(()=>{
        if(series) document.title = `(Edit) ${series.title} - Rewer`;
    }, [series]);

    async function getSeries(){
        let selectedSeries = await caller({ id: series.id }, seriesPath.selectDetailedSeries, ECallType.SELECT);
        if(selectedSeries){
            setSeries(selectedSeries);
        }
    }

    async function createSeries(){
        const newId = await caller(series, seriesPath.insertSeries, ECallType.INSERT);
        if(newId){
            setSeries({ ...series, id: newId });
            changeParam({ name: "seriesId", value: newId.toString() });
            messenger.addSuccess("Series page created.", 5000);
        } else {
            messenger.addFail("Server error: could not create series page.");
        }
    }

    async function saveSeries(){
        if(await caller(series, seriesPath.updateSeries, ECallType.ISOK)){
            messenger.addSuccess("Series details saved.", 5000);
        } else {
            messenger.addFail("Server error: series details could not be saved.");
        }
    }

    async function addGenre(genre: IGenre){
        const newSeriesGenre: ISeriesGenre = {
            id: 0,
            seriesId: series.id,
            genreId: genre.id,
            genreName: genre.name
        }
        newSeriesGenre.id = await caller(newSeriesGenre, seriesPath.insertSeriesGenre, ECallType.INSERT);
        if(newSeriesGenre.id > 0){
            setSeries({ ...series, genres: [...series.genres, newSeriesGenre] });
        } else {
            messenger.addFail("Server error: could not add genre.")
        }
    }

    async function removeGenre(id: number){
        if(await caller({ id: id }, seriesPath.deleteSeriesGenre, ECallType.ISOK)){
            setSeries({...series, genres: series.genres.filter(s=> s.id !== id)});
        } else {
            messenger.addFail("Server error: could not delete genre.");
        }
    }

    function setSeasons(newSeasons: ISeason[]){
        setSeries({...series, seasons: newSeasons})
    }

    async function deleteSeries(){
        const success = await caller({ id: series.id }, seriesPath.deleteSeries, ECallType.ISOK);
        if(success){
            const title = series.title;
            messenger.addWarning(`Series "${title}" was permanently deleted.`);
            setSeries({id: 0, title: "", summary: "", seasons: [], genres: [], avgScore: 0 });
            changeParam({ name: "seriesId", value: "0" });
        } else {
            messenger.addFail("Server error: unable to delete series.");
        }
    }

    function onDelete(){
        showModal(()=>{
            deleteSeries();
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
            <div className="adder-panel">
                {(series.id > 0)?
                (<Fragment>
                    <button onClick={saveSeries}><FontAwesomeIcon icon={faSave} />Save</button>
                    <button onClick={onDelete}><FontAwesomeIcon icon={faTrash} />Delete</button>
                </Fragment>):
                (<button onClick={createSeries}>Create series</button>)}
            </div>
            <EditSeriesDetaills series={series} setSeries={setSeries} bindSeries={bindSeries} />
            <div className="divider" />
            {(series.id > 0) ?
            (<Fragment>
                <GenreAdder movie={series} onAdd={(genre: IGenre)=> { addGenre(genre); }} onDelete={(id: number)=> { removeGenre(id) }} />
                <div className="divider" />
                <EditSeasons series={series} setSeasons={setSeasons} />
            </Fragment>) :
            (<Fragment></Fragment>)}
        </div>
    )
}