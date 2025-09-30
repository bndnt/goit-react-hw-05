import css from "./MovieReviews.module.css";
import { RequestReviewsMovieById } from "../../services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
const MovieReviews = () => {
  const { movieId } = useParams();
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // Состояние для хранения showMore для каждого отзыва
  const [showMoreMap, setShowMoreMap] = useState({});

  const toggleShowMore = (id) => {
    setShowMoreMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setLoading(true);
        const data = await RequestReviewsMovieById(movieId);
        setReview(data.results);
        // console.log("Reviews", data.results);
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
      {(!review || review.length === 0) && (
        <p>No review yet. Check it later.</p>
      )}
      {Array.isArray(review) && (
        <ul className={css.reviewList}>
          {review.map((item) => {
            const isExpanded = !!showMoreMap[item.id];
            return (
              <li className={css.reviewItem} key={item.id}>
                <span className={css.reviewAuthor}>
                  <span className={css.reviewAuthorIcon}>
                    {item.author_details.avatar_path !== null ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${item.author_details.avatar_path}`}
                        alt={item.author}
                      />
                    ) : (
                      <img
                        className={css.castImg}
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        alt={item.author}
                      />
                    )}
                  </span>
                  <span className={css.reviewAuthorName}>{item.author}</span>
                </span>
                <span className={css.reviewRate}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color:
                          i < Math.round(item.author_details.rating)
                            ? "gold"
                            : "#ccc",
                        marginRight: "2px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                  <span>
                    (
                    {item.author_details.rating > 0 ? (
                      <span>{item.author_details.rating}/10</span>
                    ) : (
                      <span>0/10</span>
                    )}
                    )
                  </span>
                </span>
                <span>
                  {isExpanded
                    ? item.content
                    : `${item.content.substring(0, 400)}${
                        item.content.length > 400 ? ".." : ""
                      }`}
                  {item.content.length > 400 && (
                    <button
                      className={css.reviewMoreBtn}
                      type="button"
                      onClick={() => toggleShowMore(item.id)}
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
