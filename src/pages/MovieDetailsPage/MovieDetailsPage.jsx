import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { RequestSingleMovieById } from "../../services/api";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await RequestSingleMovieById(movieId);
        setMovieDetails(data);
        // console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);
  return (
    <div>
      <Link to={backLinkRef.current} className={css.btnBack}>
        ← Go back
      </Link>
      {/* <p>Details of article ID: {movieId}</p> */}

      {loading && <Loader />}
      {error !== null && <p>{error}. Try adain later.</p>}
      {movieDetails !== null && (
        <div className={css.postDetailsFlex}>
          <div className={css.postDetailsImgCover}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
              alt={movieDetails.title}
            />
          </div>
          <div className={css.postDetailsInfo}>
            <h2 className={css.postDetailsTitle}>
              {movieDetails.title} ({movieDetails.release_date.slice(0, 4)})
            </h2>
            <p>User Score:{Math.round(movieDetails.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
            <h4 className={css.postDetailsGenresTitle}>Genres</h4>
            <ul className={css.postDetailsGenres}>
              {movieDetails.genres.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className={css.postDetailsAdditional}>
        <h4>Additional information</h4>
        <NavLink
          className={({ isActive }) =>
            clsx(css.postDetailsAdditionalNav, isActive && css.linkActive)
          }
          to="cast"
        >
          Cast
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            clsx(css.postDetailsAdditionalNav, isActive && css.linkActive)
          }
          to="reviews"
        >
          Reviews
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
// adult: false
//
// backdrop_path: "/s94NjfKkcSczZ1FembwmQZwsuwY.jpg"
//
// belongs_to_collection: null
//
// budget: 200000000
//
// genres: Array [ {…}, {…} ]
//
// homepage: "https://www.marvel.com/movies/the-fantastic-four-first-steps"
//
// id: 617126
//
// imdb_id: "tt10676052"
//
// origin_country: Array [ "US" ]
//
// original_language: "en"
//
// original_title: "The Fantastic 4: First Steps"
//
// overview: "Against the vibrant backdrop of a 1960s-inspired, retro-futuristic world, Marvel's First Family is forced to balance their roles as heroes with the strength of their family bond, while defending Earth from a ravenous space god called Galactus and his enigmatic Herald, Silver Surfer."
//
// popularity: 742.1079
//
// poster_path: "/cm8TNGBGG0aBfWj0LgrESHv8tir.jpg"
//
// production_companies: Array [ {…}, {…} ]
//
// production_countries: Array [ {…} ]
//
// release_date: "2025-07-22"
//
// revenue: 520716140
//
// runtime: 115
//
// spoken_languages: Array [ {…} ]
//
// status: "Released"
//
// tagline: "Welcome to the family."
//
// title: "The Fantastic 4: First Steps"
//
// video: false
//
// vote_average: 7.179
//
// vote_count: 1644
//
// <prototype>: Object { … }
