## Project description

This React application allows users to search for movies and view combined data from two public APIs: The Open Movie Database (OMDb) and 
The Movie Database (TMDB). I got the movie titles, year, and type from OMDb and got the other 3 attributes from TMDB. You might think that the logical key is the title of the movie but the actual logical key that connects both APIs is by the IMDb ID.

## APIs used (with links)

The Open Movie Database (OMDb): https://www.omdbapi.com/

The Movie Database (TMDB): https://developer.themoviedb.org/reference/search-movie

## How to set up and run locally

First you have to download and clone my repository with "git clone <your-repo-url>, and cd movie-ratings". Then comes the installation of dependencies with "npm install". Sign up for the API keys of both Database. Open MovieCompare.js and replace my OMDb and TMDB API keys with the new keys. Start the app with "npm start" and finally open it using http://localhost:3000.

## How the data join works (with a short example)

The app first fetches a list of movies from OMDb using a search term. For each movie, it uses the IMDb ID to fetch matching data from TMDb. The two datasets are joined by IMDb ID, which is present in both APIs (though not part of the table you see). A computed field, Rating Difference, is calculated as the difference between TMDb's average rating and OMDb's IMDb rating. User searches for "Inception". OMDb returns movie details including IMDb ID tt1375666. TMDb is queried with this IMDb ID, returning its rating and vote count. The app displays both ratings and their difference in a single table row.

## Known limitations

Well the obvious hurdle was the skill and knowledge about APIs. I had to go through multiple youtube videos and some troubleshooting and documentation drafting was assisted by AI. Other than that, free API keys may have daily request limits (OMDb: 1000/day, TMDb: 40 requests/10 seconds). Lastly, Some movies may not be found in both APIs, resulting in missing data for certain fields.

These are the videos that guided me through the assignment:

https://www.youtube.com/watch?v=UZtruL7svkc

https://www.youtube.com/watch?v=FlFyrOEz2S4

https://www.youtube.com/watch?v=Mt3kxUvHORA

https://www.youtube.com/watch?v=MBlZ8Wzkbi4


## AI usage note

Specific promts that I asked AI:

"ownerHasFunctionTypeWarning[parentName] ||
react-dom-client.development.js:7092 Functions are not valid as a React child. This may happen if you return MovieRating instead of <MovieRating /> from render. Or maybe you meant to call this function rather than return it." showed up in the console... how can I troubleshoot this?

"guest_session_id; string; required." I don't quite get the guest_session_id, please explain.

"I have to do both qmdb and tmdb for the react. I was able to run both on postman. Can you help now for guiding me through the single view on react because no prior knowledge?" 

"paulkimy22@Paul movie-ratings % npm run-script
Lifecycle scripts included in movie-ratings@0.1.0:
  start
    react-scripts start
  test
    react-scripts test
available via `npm run-script`:
  build
    react-scripts build
  eject
    react-scripts eject

What to do when npm start does not work?"

"I got the npm start working but i dont see anything on my terminal for so long?"