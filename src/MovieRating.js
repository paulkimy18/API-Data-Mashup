import React, { useState } from 'react';
import axios from 'axios';

const OMDB_API_KEY = '3a085e27';
const TMDB_API_KEY = '09de2c1abaa1035e4e5e5d90bc67adf4';

function MovieRating() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMovies = async () => {
    setLoading(true);
    setError('');
    setMovies([]);
    try {
      const omdbRes = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`);
      if (!omdbRes.data.Search) throw new Error('No movies found in OMDb.');

      const moviePromises = omdbRes.data.Search.map(async (movie) => {
        const tmdbRes = await axios.get(
          `https://api.themoviedb.org/3/find/${movie.imdbID}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
        );
        const tmdbMovie = tmdbRes.data.movie_results[0];
    
        const omdbRating = parseFloat(movie.imdbRating || 0);
        const tmdbRating = tmdbMovie ? tmdbMovie.vote_average : null;
        return {
          title: movie.Title,
          year: movie.Year,
          type: movie.Type,
          omdbID: movie.imdbID,
          omdbPoster: movie.Poster,
          tmdbRating,
          tmdbVotes: tmdbMovie ? tmdbMovie.vote_count : null,
          ratingDiff: tmdbRating && omdbRating ? (tmdbRating - omdbRating).toFixed(2) : 'N/A',
        };
      });
      const combined = await Promise.all(moviePromises);
      setMovies(combined);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Movie Ratings Comparison</h2>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button onClick={fetchMovies} disabled={loading || !query}>Search</button>
      {loading && <p>Loading...</p>}
      {error && (
        <div>
          <p style={{ color: 'red' }}>{error}</p>
          <button onClick={fetchMovies}>Retry</button>
        </div>
      )}
      {!loading && !error && movies.length === 0 && <p>No results yet.</p>}
      {movies.length > 0 && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Type</th>
              <th>TMDb Rating</th>
              <th>TMDb Votes</th>
              <th>Rating Difference</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m, i) => (
              <tr key={m.omdbID}>
                <td>{m.title}</td>
                <td>{m.year}</td>
                <td>{m.type}</td>
                <td>{m.tmdbRating !== null ? m.tmdbRating : 'N/A'}</td>
                <td>{m.tmdbVotes !== null ? m.tmdbVotes : 'N/A'}</td>
                <td>{m.ratingDiff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MovieRating;