import { IArtistCast, ICast, ICastType } from "../../common/cast";

export async function insertCastQuery(conn: any, cast: ICast): Promise<number | null>{
    const result = 
    await conn.query("INSERT INTO casts (artistId, entryId, creditTypeId, name) VALUES (?, ?, ?, ?)", [cast.artistId, cast.entryId, cast.castTypeId, cast.name]);
    if(result[0].insertId > 0){
        return result[0].insertId;
    }
    return null;
}

export async function updateCastQuery(conn: any, cast: ICast): Promise<boolean>{
    const result = 
    await conn.query("UPDATE casts SET name = ?, creditTypeId = ? WHERE id = ?", [cast.name, cast.castTypeId, cast.id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function deleteCastQuery(conn: any, id: number): Promise<boolean>{
    const result = 
    await conn.query("DELETE FROM casts WHERE id = ?", [id]);
    if(result[0].affectedRows > 0){
        return true;
    }
    return false;
}

export async function selectCastByArtistQuery(conn: any, artistId: number): Promise<ICast[]>{
    const result = 
    await conn.query("SELECT casts.id, casts.artistId, casts.entryId, casts.creditTypeId as castTypeId, casts.name as castName, entries.title as entryTitle, artists.name as artistName FROM casts INNER JOIN entries on casts.entryId = entries.id INNER JOIN artists on casts.artistId = artists.id WHERE casts.artistId = ? GROUP BY casts.id", [artistId]);
    return result[0];
} 

export async function selectSpotLightQuery(conn: any, limit: number, offset: number): Promise<ICast>{
    const today: string = new Date().toISOString().split('T')[0];
    const result = 
    await conn.query("SELECT casts.id, casts.artistId, casts.entryId, casts.creditTypeId as castTypeId, casts.name as castName, entries.title as entryTitle, artists.name as artistName FROM entries INNER JOIN casts ON entries.id = casts.entryId INNER JOIN artists ON casts.artistId = artists.id WHERE entries.seasonId IS NULL AND entries.releaseDate <= ? AND (casts.creditTypeId = 4 OR casts.creditTypeId = 5) GROUP BY casts.id ORDER BY movies.releaseDate DESC LIMIT ? OFFSET ?", [today, limit, offset]);
    return result[0];
}

export async function selectCastTypesQuery(conn: any): Promise<ICastType[]>{
    const result = await conn.query("SELECT id as value, name FROM creditTypes");
    return result[0];
}

export async function selectArtistCastsByArtistQuery(conn, artistId: number): Promise<IArtistCast>{
    const result = await conn.query("SELECT casts.id, casts.artistId, casts.entryId, casts.creditTypeId AS castTypeId, casts.name AS name, entries.title AS entryTitle, entries.type as entryType, entries.releaseDate AS entryDate, creditTypes.name AS castTypeName, series.id as seriesId, series.title as seriesTitle FROM casts INNER JOIN entries ON casts.entryId = entries.id INNER JOIN creditTypes ON casts.creditTypeId = creditTypes.id LEFT OUTER JOIN seasons ON entries.seasonId = entries.seasonId LEFT OUTER JOIN series ON seasons.seriesId = series.id WHERE casts.artistId = ? GROUP BY casts.id", [artistId]); //ez retardált, de nem merek hozzányúlni
    return result[0];
}

export async function selectCastsByEntriesQuery(conn, entryIds: number[]): Promise<ICast[]>{
    const result = 
    await conn.query("SELECT casts.id, casts.artistId, casts.entryId, casts.creditTypeId as castTypeId, casts.name as name, entries.title as entryTitle, artists.name as artistName FROM casts INNER JOIN entries on casts.entryId = entries.id INNER JOIN artists on casts.artistId = artists.id WHERE casts.entryId IN (?) GROUP BY casts.id", [entryIds]);
    return result[0];
}