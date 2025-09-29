import css from "./MovieCast.module.css";
import { RequestCastMovieById } from "../../services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setLoading(true);
        const data = await RequestCastMovieById(movieId);
        setCast(data.cast);
        // console.log("Cast", data.cast);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={css.castBlock}>
      {loading && <Loader />}
      {error !== null && <p>{error}. Try again later.</p>}
      {cast !== null ? (
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 2.2,
              spaceBetween: 10,
            },
            650: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            991: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          navigation={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Mousewheel, Keyboard]}
          className={(css.mySwiper, css.swiper)}
        >
          {cast.map((item) => (
            <SwiperSlide className={css.castItem} key={item.id}>
              {item.profile_path !== null ? (
                <img
                  className={css.castImg}
                  src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                  alt={item.name}
                />
              ) : (
                <img
                  className={css.castImg}
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt={item.name}
                />
              )}
              <p className={css.castName}>{item.name}</p>
              <p className={css.castChar}>{item.character}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>There is not any cast information.</p>
      )}
    </div>
  );
};

export default MovieCast;
// Object { id: 617126, cast: (70) […], crew: (144) […] }
//
// cast: Array(70) [ {…}, {…}, {…}, … ]
//
// 0: Object { adult: false, gender: 2, id: 1253360, … }
//
// adult: false
//
// cast_id: 23
//
// character: "Reed Richards / Mister Fantastic"
//
// credit_id: "65cce4a4e210230162c35b9f"
//
// gender: 2
//
// id: 1253360
//
// known_for_department: "Acting"
//
// name: "Pedro Pascal"
//
// order: 0
//
// original_name: "Pedro Pascal"
//
// popularity: 9.9292
//
// profile_path: "/oKcMbVn0NJTNzQt0ClKKvVXkm60.jpg"
//
// <prototype>: Object { … }
//
// 1: Object { adult: false, gender: 1, id: 556356, … }
//
// adult: false
//
// cast_id: 24
//
// character: "Sue Storm / Invisible Woman"
//
// credit_id: "65cce4c0efd3c2017c37d90f"
//
// gender: 1
//
// id: 556356
//
// known_for_department: "Acting"
//
// name: "Vanessa Kirby"
//
// order: 1
//
// original_name: "Vanessa Kirby"
//
// popularity: 7.6721
//
// profile_path: "/a8a9U00KL2JJkkekzhNnueIGKKF.jpg"
