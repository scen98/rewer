import { IEntryGenre, IGenre, ISeriesGenre } from "../../common/genre";
import { IEntry } from "../../common/movie";
import { UploadFile } from "../callers/caller";

export const moviePath = {
    selectDetailedMovie: "/movie/select_detailed_movie",
    selectLatestMovies: "/movie/select_latest_movies",
    selectLatestMoviesByGenre: "/movie/select_latest_movies_by_genre",
    selectMoviesByScore: "/movie/select_movies_by_score",
    getGenres: "/genre/select_movie_genres",
    insertMovie: "/movie/insert_movie",
    updateMovie: "/movie/update_movie",
    deleteMovie: "/movie/delete_movie",
    uploadPoster: "/movie/upload_poster",
    insertEntryGenre: "/genre/insert_entry_genre",
    deleteEntryGenre: "/genre/delete_entry_genre",
    selectUpcomingMovies: "/movie/select_upcoming_movies"
}

export async function uploadPoster(file: FormData): Promise<boolean>{
    const response = await UploadFile("/movie/upload_poster", file);
    if(response.ok){
        return true;
    }
    return false;
}

export function compareGenresByName(genre1: IGenre, genre2: IGenre){
    return genre1.name.localeCompare(genre2.name);
}

export function compareMovieGenresByName(genre1: IEntryGenre | ISeriesGenre, genre2: IEntryGenre | ISeriesGenre){
    return genre1.genreName.localeCompare(genre2.genreName);
}

export function isEntryReleased(entry: IEntry){
    return new Date().getTime() >= new Date(entry.releaseDate).getTime();
}