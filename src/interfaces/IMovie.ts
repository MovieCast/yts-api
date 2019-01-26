import { IYtsCastPerson } from "./ICastPerson";
import { IYtsTorrent } from "./ITorrent";

export interface IYtsMovie {
    /**
     * The yts movie id
     */
    id: number;

    /**
     * The url to yts for this movie
     */
    url: string;

    /**
     * The imdb code for this movie
     */
    imdb_code: string;

    /**
     * The movie title
     */
    title: string;

    /**
     * The long movie title (includes the year)
     */
    title_long: string;

    /**
     * The movie slug
     */
    slug: string;

    /**
     * The movie's release year
     */
    year: number;

    /**
     * The movie rating
     */
    rating: number;

    /**
     * The movie runtime
     */
    runtime: number;

    /**
     * The movie genres
     */
    genres: string[];

    /**
     * A summary of the movie
     */
    summary: string;

    /**
     * A more complete summary of the movie
     */
    description_full: string;

    /**
     * The synopsis of the movie
     */
    synopsis: string;

    /**
     * A youtube video code to the trailer of the movie
     */
    ys_trailer_code: string;

    /**
     * The spoken language of the movie
     */
    language: string;

    /**
     * The mpa rating of the movie
     */
    mpa_rating: string;

    background_image: string;
    background_image_original: string;

    small_cover_image: string;
    medium_cover_image: string;
    large_cover_image: string;

    cast?: IYtsCastPerson[];

    torrents: IYtsTorrent[];
}
