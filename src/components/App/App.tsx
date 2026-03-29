import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { searchFilms } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [films, setFilms] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const [isError, setIsError] = useState(false);
  const handleSearch = async (data: string) => {
    try {
      setFilms([]);
      setLoading(true);
      setIsError(false);
      const movies = await searchFilms(data);
      console.log(movies);

      if (movies.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setFilms(movies);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {isError && <ErrorMessage />}
      <Toaster position="top-center" reverseOrder={false} />
      <MovieGrid movies={films} onSelect={openModal} />
      {isModalOpen && selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie} />
      )}
    </div>
  );
}
