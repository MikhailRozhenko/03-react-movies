import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { searchFilms } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import SearchBar from '../SearchBar/SearchBar';

export default function App() {
  const [films, setFilms] = useState<Movie[]>([]);
  const handleSearch = async (data: string) => {
    setFilms([]);
    const movies = await searchFilms(data);
    console.log(movies);

    if (movies.length === 0) {
      toast.error('No movies found for your request.');
      return;
    }

    setFilms(movies);
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-center" reverseOrder={false} />
      <MovieGrid movies={films} />
    </>
  );
}
