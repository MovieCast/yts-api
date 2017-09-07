/**
 * Example: Movie
 * 
 * Below is an example on how you can get
 * a single movie by id from yts.
 */

const YtsApi = require('../')

const ytsApi = new YtsApi()

ytsApi.getMovie(5512, {
    withImages: true,
    withCast: true
}).then(res => {
    const movie = res.data.movies[0];
    
    console.log(`Title: ${movie.title}`);

    for(person in movie.cast) {
        console.log(`${person.name} plays as ${person.character_name}`);
    }
});