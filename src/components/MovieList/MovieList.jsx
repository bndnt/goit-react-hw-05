import css from "./MovieList.module.css";
import { RequestPopularMovies } from "../../services/api";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";

const MovieList = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchMoviesList = async () => {
      try {
        setLoading(true);
        const data = await RequestPopularMovies();
        setLoading(false);
        setMovies(data.results);
        // console.log(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesList();
  }, []);
  return (
    <>
      {loading && <Loader />}
      {error !== null && <p>{error}. Try adain later.</p>}

      <ul className={css.moviesList}>
        {Array.isArray(movies) &&
          movies.map((item) => (
            <Link
              key={item.id}
              state={{ from: location }}
              to={`/movies/${item.id}`}
              className={css.moviesListLink}
            >
              <li className={css.moviesListItem}>
                <span className={css.moviesListItemRate}>
                  {item.vote_average.toFixed(1)}
                </span>
                <img
                  className={css.moviesListItemImg}
                  src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                  alt={item.original_title}
                />
                <span className={css.moviesListItemText}>
                  {item.original_title}
                </span>
              </li>
            </Link>
          ))}
      </ul>
    </>
  );
};

export default MovieList;
// adult: false

// backdrop_path: "/a6bItEVaxgphpMswho1wVRerv4r.jpg"
//
// genre_ids: Array(4) [ 28, 12, 53, … ]
//
// id: 7451
//
// media_type: "movie"
//
// original_language: "en"
//
// original_title: "xXx"
//
// overview: `Xander Cage is your standard adrenaline junkie with no fear and a lousy attitude. When the US Government "recruits" him to go on a mission, he's not exactly thrilled. His mission: to gather information on an organization that may just be planning the destruction of the world, led by the nihilistic Yorgi.`
//
// popularity: 87.6961
//
// poster_path: "/xeEw3eLeSFmJgXZzmF2Efww0q3s.jpg"
//
// release_date: "2002-08-09"
//
// title: "xXx"
//
// video: false
//
// vote_average: 5.964
//
// vote_count: 4565
