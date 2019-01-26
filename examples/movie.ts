/**
 * Example: Movie
 *
 * Below is an example on how you can get
 * a single movie by id from yts.
 */

import { YtsApi } from "../src/YtsApi";

const ytsApi = new YtsApi();

ytsApi.getMovieDetails(5512, {
  withImages: true,
  withCast: true,
}).then((res) => {
  const { movie } = res.data;

  console.log(`Title: ${movie.title}`);

  console.log('Cast:');
  for (const person of movie.cast) {
    console.log(`${person.name} plays as ${person.character_name}`);
  }
});
