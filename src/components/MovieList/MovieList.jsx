import css from "./MovieList.module.css";
import {
  RequestPopularMovies,
  RequestMovieBySearchValue,
} from "../../services/api";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import Clapperboard from "../../../public/clapperboard.png";

const MovieList = ({ query }) => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchMoviesList = async () => {
      try {
        setLoading(true);
        if (query) {
          const data = await RequestMovieBySearchValue(query);

          if (data.results.length === 0) {
            setError(true);
            // console.log(`data.results.length ===0 :${data.results.length}`);
          } else {
            setMovies(data.results);
            // console.log("Movies List:", data.results);
          }
        } else {
          const data = await RequestPopularMovies();
          setMovies(data.results);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesList();
  }, [query]);
  return (
    <>
      {loading && <Loader />}
      {error !== null && <p>{error}. Try adain later.</p>}

      <ul className={css.moviesList}>
        {Array.isArray(movies) &&
          movies
            .slice()
            .sort((a, b) => b.vote_average - a.vote_average)
            .map((item) => (
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
                  <span className={css.moviesListItemImgCover}>
                    {item.poster_path ? (
                      <img
                        className={css.moviesListItemImg}
                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                        alt={item.original_title}
                      />
                    ) : item.backdrop_path ? (
                      <img
                        className={css.moviesListItemImg}
                        src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                        alt={item.original_title}
                      />
                    ) : (
                      <img
                        src={Clapperboard}
                        alt="img"
                        className={
                          (css.moviesListItemImg, css.moviesListItemNoImg)
                        }
                      />
                    )}
                  </span>
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
