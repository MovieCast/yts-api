// Not using the fancy imports because to lazy to make a build script
const got = require('got');

class YtsAPI {

    /**
     * Create a new instance of YtsAPI.
     * @param {Object} config - The configuration for the api.
     */
    constructor({baseUrl = 'http://yts.aq/api/v2/'}) {

        /**
         * The base url of yts.
         * @type {String}
         */
        this.baseUrl = baseUrl;
    }

    /**
     * Make a get request to the set baseUrl.
     * @param {String} endpoint - The endpoint to make the request to.
     * @param {Object} query - The query parameters of the HTTP request.
     * @returns {Promise} - The response body.
     */
    get(endpoint, query) {
        const uri = `${this.baseUrl}${endpoint}`;
    
        return got.get(uri, {
            query,
            json: true
        }).then(({ body }) => body);
    }

    /**
     * Gets a list of movies from yts.
     * @param {Object} query - The query object to be send to yts.
     * @returns {Promise} - A list of movies from yts.
     */
    getMovies({
        limit = 20,
        page = 1,
        quality = 'All',
        minimumRating = 0,
        queryTerm,
        genre,
        sortyBy = 'date_added',
        orderBy = 'desc',
        withRtRatings = false
    }) {
        
        // Yay a lot of checks, some ppl might want 1337 movies at once, we can't accept that!
        if (limit < 1 || limit > 50) {
            throw new Error(`${limit} is not a valid value for limit!`)
        }
        if (minimumRating < 0 || minimumRating > 9) {
            throw new Error(
                `${minimumRating} is not a valid value for minimumRating!`
            )
        }
        if (typeof withRtRatings !== 'boolean') {
            throw new Error(
                `${withRtRatings} is not a valid value for withRtRatings!`
            )
        }

        return this.get('list_movies.json', {
            limit,
            page,
            quality,
            minimum_rating: minimumRating,
            query_term: queryTerm,
            genre,
            sorty_by: sortyBy,
            order_by: orderBy,
            with_rt_ratings: withRtRatings
        });
    }

    /**
     * Gets a movie from yts.
     * @param {Number} id - The id of the movie you want to get.
     * @param {Object} options - Some extra options.
     * @returns {Promise} - A movie from yts.
     */
    getMovie(id, {withImages = false, withCast = false}) {

        // Checkssssss
        if (!id || typeof id !== 'number') {
            throw new Error(`${id} is not a valid value for id!`)
        }
        if (typeof withImages !== 'boolean') {
            throw new Error(`${withImages} is not a valid value for withImages!`)
        }
        if (typeof withCast !== 'boolean') {
            throw new Error(`${withCast} is not a valid value for withCast!`)
        }

        return this.get('movie_details.json', {
            movie_id: id,
            with_images: withImages,
            with_cast: withCast
        })
    }
}

module.exports = YtsAPI;