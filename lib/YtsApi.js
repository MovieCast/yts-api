"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const got = require("got");
class YtsApi {
    constructor({ domain = "https://yts.am", version = 2, } = {}) {
        this.baseUrl = `${domain}/api/v${version}`;
    }
    /**
     * Gets a list of movies from yts
     * @param query The query
     */
    async getMovieList({ limit = 20, page = 1, quality = "All", minimumRating = 0, queryTerm, genre, sortBy = "date_added", orderBy = "desc", withRtRatings = false, } = {}) {
        if (limit < 1 || limit > 50) {
            throw new Error(`${limit} is not a valid value for limit, expected a number in the range of 1 - 50!`);
        }
        if (minimumRating < 0 || minimumRating > 9) {
            throw new Error(`
                ${minimumRating} is not a valid value for minimumRating, expected a number in the range of 0 - 9!`);
        }
        if (typeof withRtRatings !== "boolean") {
            throw new Error(`${withRtRatings} is not a valid value for withRtRatings, expected an boolean!`);
        }
        return this.get("/list_movies.json", {
            limit,
            page,
            genre,
            quality,
            minimum_rating: minimumRating,
            query_term: queryTerm,
            sorty_by: sortBy,
            order_by: orderBy,
            with_rt_ratings: withRtRatings,
        });
    }
    /**
     * Gets a movie from yts
     * @param {Number} id - The movie id
     * @param options - Extra options
     */
    async getMovieDetails(id, { withCast = false, withImages = false, } = {}) {
        // Checkssssss
        if (!id || typeof id !== "number") {
            throw new Error(`${id} is not a valid value for id, expected an number!`);
        }
        if (typeof withImages !== "boolean") {
            throw new Error(`${withImages} is not a valid value for withImages, expected an boolean!`);
        }
        if (typeof withCast !== "boolean") {
            throw new Error(`${withCast} is not a valid value for withCast, expected an boolean!`);
        }
        return this.get("/movie_details.json", {
            movie_id: id,
            with_cast: withCast,
            with_images: withImages,
        });
    }
    /**
     * Make a get request to the given endpoint
     * @param endpoint The endpoint
     * @param query The query parameters
     */
    async get(endpoint, query) {
        const res = await got.get(`${this.baseUrl}${endpoint}`, {
            query,
            json: true,
        });
        return res.body;
    }
}
exports.YtsApi = YtsApi;
//# sourceMappingURL=YtsApi.js.map