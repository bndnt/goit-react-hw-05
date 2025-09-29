import React from "react";
import MovieList from "../components/MovieList/MovieList";

const HomePage = () => {
  return (
    <div>
      <h1>Trending today</h1>
      <MovieList />
    </div>
  );
};

export default HomePage;
