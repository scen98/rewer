import { IArtist, IDetailedArtist } from "../../common/artist";
import { IEntryCast, ISeriesCast } from "../../common/cast";
import { selectArtistCastsByArtistQuery } from "./castQueries";

export async function selectArtistsByKeywordQuery(conn: any, keyword: string, limit: number, offset: number): Promise<IArtist[]>{
    const result = await conn.query("SELECT * FROM artists WHERE name LIKE CONCAT('%',?,'%') LIMIT ? OFFSET ?;", [keyword, limit, offset]);
    return result[0];
}

export async function selectArtistQuer(conn: any, id: number){
    const result = await conn.query("SELECT * FROM artists WHERE id = ?", [id]);
    return result[0][0];
}

export async function insertArtistQuery(conn: any, artist: IArtist): Promise<number | null>{
    const result = await conn.query("INSERT INTO artists (name, birthPlace, birthDate, deathPlace, deathDate, bio) VALUES (?, ?, ?, ?, ?, ?)",
    [artist.name, artist.birthPlace, artist.birthDate, artist.deathPlace, artist.deathDate, artist.bio]);
    if(result[0].insertId > 0){
        return result[0].insertId;
    }
    return null;
}

export async function updateArtistQuery(conn: any, artist: IArtist): Promise<boolean>{
    const result = await conn.query("UPDATE artists SET name = ?, birthPlace = ?, birthDate = ?, deathPlace = ?, deathDate = ?, bio = ? WHERE id = ?", 
    [artist.name, artist.birthPlace, artist.birthDate, artist.deathPlace, artist.deathDate, artist.bio, artist.id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function deleteArtistQuery(con, id: number){
    const result = await con.query("DELETE FROM artists WHERE id = ?", [id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function selectDetailedArtistQuery(conn, id: number): Promise<IDetailedArtist | null>{
    const result = await conn.query("SELECT * FROM artists WHERE id = ?", [id]);
    if(!(result[0].length > 0)){
        return null;
    }
    const detailedArtist: IDetailedArtist = result[0][0];

    const casts = await selectArtistCastsByArtistQuery(conn, id);
    detailedArtist.entryCasts = retrieveMovieCasts(casts);
    detailedArtist.seriesCasts = rereieveSeriesCasts(casts);
    return detailedArtist;
}

export function retrieveMovieCasts(unsortedCasts): IEntryCast[]{
    return unsortedCasts.filter(u=> u.seriesId == null);
}

export function rereieveSeriesCasts(unsortedCasts): ISeriesCast[]{
    let result: ISeriesCast[] = [];
    unsortedCasts.filter(c=> c.seriesId > 0).forEach(ep => {   
        manageEpisodeCast(ep, result);
    });
    return result;
}

function manageEpisodeCast(episodeCast, seriesCasts: ISeriesCast[]){
    const existingSeriesCast: ISeriesCast = seriesCasts.find(c=> c.seriesId === episodeCast.seriesId);
    if(existingSeriesCast){  
        modifyExistingEpisodeCast(existingSeriesCast, episodeCast);
    } else {
        addNewEpisodeCast(seriesCasts, episodeCast);
    }
}

function addNewEpisodeCast(seriesCasts: ISeriesCast[], episodeCast){//delete goes brrrrrrr
    delete episodeCast.entryId;
    delete episodeCast.entryTitle;
    episodeCast.firstEpisodeDate = episodeCast.entryDate;
    delete episodeCast.entryDate;
    seriesCasts.push({...episodeCast, episodeCount: 1});
}

function modifyExistingEpisodeCast(existingSeriesCast: ISeriesCast, episodeCast){
    if(new Date(existingSeriesCast.firstEpisodeDate) > new Date(episodeCast.releaseDate)){
        existingSeriesCast = { ...existingSeriesCast, episodeCount: existingSeriesCast.episodeCount++, firstEpisodeDate: episodeCast.releaseDate }
    } else {
        existingSeriesCast = { ...existingSeriesCast, episodeCount: existingSeriesCast.episodeCount++ }
    }
}