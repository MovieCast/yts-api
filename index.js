const got = require('got');

class YtsAPI {
  /**
   * @typedef {Object} YtsConfig
   * @property {String} baseUrl - API base URL
   */

  /**
   * Create a new instance of YtsAPI.
   * @param {YtsConfig} config - The configuration for the api.
   */
  constructor({ baseUrl = 'http://yts.ag/api/v2/' } = {}) {
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
   * @returns {Promise<Object>} - The response body.
   */
  async get(endpoint, query) {
    const uri = `${this.baseUrl}${endpoint}`;

    const res = await got.get(uri, {
      query,
      json: true,
    });


    return res.body;
  }

  /**
   * @typedef {Object} YtsMoviesOptions
   * @property {number} limit - Limit of movies to fetch (1-50)
   * @property {number} page - Page number
   * @property {String} quality - Filter movies by quality (720p, 1080p, 3D)
   * @property {number} minimumRating - Filter movies by a minimum rating
   * @property {String} queryTerm - Filter movies by a term
   * @property {String} genre - Filter movies by genre
   * @property {String} sortBy - Sort ()
   * @property {String} orderBy - Order (asc, desc)
   * @property {boolean} withRtRatings - Whether to include rotten tomatoes rating
   */

  /**
   * Gets a list of movies from yts.
   * @param {YtsMoviesOptions} query - The query object to be send to yts.
   * @returns {Promise<Object[]>} - A list of movies from yts.
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
    withRtRatings = false,
  } = {}) {
    // Yay a lot of checks, some ppl might want 1337 movies at once, we can't accept that!
    if (limit < 1 || limit > 50) {
      throw new Error(`${limit} is not a valid value for limit, expected a number in the range of 1 - 50!`);
    }
    if (minimumRating < 0 || minimumRating > 9) {
      throw new Error(`${minimumRating} is not a valid value for minimumRating, expected a number in the range of 0 - 9!`);
    }
    if (typeof withRtRatings !== 'boolean') {
      throw new Error(`${withRtRatings} is not a valid value for withRtRatings, expected an boolean!`);
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
      with_rt_ratings: withRtRatings,
    });
  }

  /**
   * @typedef {Object} YtsMovieOptions
   * @property {boolean} withImages - Whether to include images
   * @property {boolean} withCast - Whether to include cast information
   */

  /**
   * Gets a movie from yts.
   * @param {Number} id - The id of the movie you want to get.
   * @param {YtsMovieOptions} options - Some extra options.
   * @returns {Promise<Object>} - A movie from yts.
   */
  getMovie(id, { withImages = false, withCast = false } = {}) {
    // Checkssssss
    if (!id || typeof id !== 'number') {
      throw new Error(`${id} is not a valid value for id, expected an number!`);
    }
    if (typeof withImages !== 'boolean') {
      throw new Error(`${withImages} is not a valid value for withImages, expected an boolean!`);
    }
    if (typeof withCast !== 'boolean') {
      throw new Error(`${withCast} is not a valid value for withCast, expected an boolean!`);
    }

    return this.get('movie_details.json', {
      movie_id: id,
      with_images: withImages,
      with_cast: withCast,
    });
  }
}

module.exports = YtsAPI;
