import React, { useEffect, useState } from "react";
import css from "./MoviesPage.module.css";
import SearchMovie from "../../components/SearchMovie/SearchMovie";

import MovieList from "../../components/MovieList/MovieList";
import { useLocation, useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  // const [searchValue, setSearchValue] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");
  const onSearch = (searchTerm) => {
    setSearchParams({ query: searchTerm });
  };
  return (
    <div>
      <SearchMovie onSubmit={onSearch} />
      {query !== null && query.length > 0 && <MovieList query={query} />}
    </div>
  );
};

export default MoviesPage;
