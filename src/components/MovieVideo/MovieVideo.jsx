import css from "./MovieVideo.module.css";
import React, { useEffect, useState } from "react";
import { RequestVideoMovieById } from "../../services/api";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
const MovieVideo = () => {
  const { movieId } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setLoading(true);
        const data = await RequestVideoMovieById(movieId);
        setVideo(data.results);
        console.log("Video", data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieCast();
  }, [movieId]);
  return (
    <div>
      {loading && <Loader />}
      {error !== null && <p>{error}. Try again later.</p>}
      {video !== null && (
        <ul className={css.videoList}>
          {video
            .filter((item) => item.type === "Trailer")
            .slice(0, 1)
            .map((item) => (
              <li key={item.id}>
                <iframe
                  className={css.videoFrame}
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title={item.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MovieVideo;
