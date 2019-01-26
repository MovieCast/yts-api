export interface IYtsMoviesQuery {
    /**
     * The limit of results per page
     */
    limit?: number;

    /**
     * Used to see the next page of movies, eg limit=15 and page=2 will show you movies 15-30
     */
    page?: number;

    /**
     * Used to filter by a given quality
     */
    quality?: "All" | "720p" | "1080p" | "3D";

    /**
     * Used to filter movie by a given minimum IMDb rating
     */
    minimumRating?: number;

    /**
     * Used for movie search, matching on:
     * Movie Title/IMDb Code, Actor Name/IMDb Code, Director Name/IMDb Code
     */
    queryTerm?: string;

    /**
     * Used to filter by a given genre
     */
    genre?: string; // TODO

    /**
     * Sorts the results by choosen value
     */
    sortBy?: "title" | "year" | "rating" | "peers" | "seeds" | "download_count" | "like_count" | "date_added";

    /**
     * Orders the results by either Ascending or Descending order
     */
    orderBy?: "desc" | "asc";

    /**
     * Returns the list with the Rotten Tomatoes rating included
     */
    withRtRatings?: boolean;
}
