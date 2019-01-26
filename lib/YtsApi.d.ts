import { IYtsMovieData, IYtsMovieListData, IYtsMovieQuery, IYtsMoviesQuery, IYtsResponse } from "./interfaces";
export interface IYtsApiConfig {
    domain?: string;
    version?: number;
}
export declare class YtsApi {
    private baseUrl;
    constructor({ domain, version, }?: IYtsApiConfig);
    /**
     * Gets a list of movies from yts
     * @param query The query
     */
    getMovieList({ limit, page, quality, minimumRating, queryTerm, genre, sortBy, orderBy, withRtRatings, }?: IYtsMoviesQuery): Promise<IYtsResponse<IYtsMovieListData>>;
    /**
     * Gets a movie from yts
     * @param {Number} id - The movie id
     * @param options - Extra options
     */
    getMovieDetails(id: number, { withCast, withImages, }?: IYtsMovieQuery): Promise<IYtsResponse<IYtsMovieData>>;
    /**
     * Make a get request to the given endpoint
     * @param endpoint The endpoint
     * @param query The query parameters
     */
    private get;
}
