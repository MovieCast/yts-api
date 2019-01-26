/**
 * Example: Movie List
 *
 * Below is an example on how you can get
 * a list of movies from yts.
 */

import { YtsApi } from "../src/YtsApi";

const ytsApi = new YtsApi();

ytsApi.getMovieList({
  limit: 20,
  page: 1,
  quality: '1080p',
  sortBy: 'date_added',
  orderBy: 'desc',
  withRtRatings: true,
}).then((res) => {
  console.log(res.data.movies);
});
