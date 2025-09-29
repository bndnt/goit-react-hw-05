import css from "./App.module.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "../../components/Navigation/Navigation";
import HomePage from "../../pages/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";

function App() {
  return (
    <div>
      <header className={css.header}>
        <div className={css.container}>
          <Navigation />
        </div>
      </header>
      <main className={css.main}>
        <div className="mainWrap">
          <div className={css.container}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="//movies/:movieId" element={<MovieDetailsPage />}>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Route>
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
