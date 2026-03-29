import axios from 'axios';
import type { Movie } from '../types/movie';

interface MovieArticles {
  results: Movie[];
}

export const searchFilms = async (search: string) => {
  const response = await axios.get<MovieArticles>(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query: search,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    },
  );

  return response.data.results;
};
