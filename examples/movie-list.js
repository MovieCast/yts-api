/**
 * Example: Movie List
 * 
 * Below is an example on how you can get
 * a list of movies from yts.
 */

const YtsApi = require('../');

const ytsApi = new YtsApi();

ytsApi.getMovies({
  limit: 20,
  page: 1,
  quality: '1080p',
  sortBy: 'date_added',
  orderBy: 'desc',
  withRtRatings: true
}).then(res => {
  console.log(res.data.movies);
});