import { IYtsMovie } from "./IMovie";
export interface IYtsResponse<T> {
    status: string;
    status_message: string;
    data: T;
}
export interface IYtsMovieListData {
    movie_count: number;
    limit: number;
    page_number: string;
    movies?: IYtsMovie[];
}
export interface IYtsMovieData {
    movie: IYtsMovie;
}
