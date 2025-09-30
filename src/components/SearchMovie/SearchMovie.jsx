import css from "./SearchMovie.module.css";

const SearchMovie = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputValue = form.elements.movie.value;
    // if (inputValue.trim() === "") {

    // }
    onSubmit(inputValue);
    form.reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span></span>
          <input type="text" placeholder="Search" name="movie" />
        </label>
        <button>Search</button>
      </form>
    </div>
  );
};

export default SearchMovie;
