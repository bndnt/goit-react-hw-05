import css from "./SearchMovie.module.css";
import Search from "../../assets/search-svgrepo-com.svg";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

const SearchMovie = ({ onSubmit }) => {
  const [notification, setNotification] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputValue = form.elements.movie.value;
    if (inputValue.trim() === "") {
      setNotification(true);
    } else {
      setNotification(false);
      onSubmit(inputValue);
    }
    form.reset();
  };
  const notify = () => toast.remove();
  toast.error("Type at least 1 symbol.");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={css.searchInputCover}>
          <label className={css.searchLabel}>
            <input
              className={css.searchInput}
              type="text"
              placeholder="Search"
              name="movie"
            />
          </label>
          <button onClick={notify} className={css.searchBtn}>
            <img src={Search} alt="Search" className="searchIcon" />
          </button>
          {notification && (
            <Toaster position="top-center" reverseOrder={false} />
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchMovie;
