import css from "./App.module.css";
import { lazy, Suspense, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "../Loader/Loader";

// import Navigation from "../../components/Navigation/Navigation";
// import HomePage from "../../pages/HomePage";
// import MoviesPage from "../../pages/MoviesPage/MoviesPage";
// import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
// import MovieCast from "../MovieCast/MovieCast";
// import MovieReviews from "../MovieReviews/MovieReviews";
// import MovieVideo from "../MovieVideo/MovieVideo";
const Navigation = lazy(() => import("../../components/Navigation/Navigation"));
const HomePage = lazy(() => import("../../pages/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const MovieVideo = lazy(() => import("../MovieVideo/MovieVideo"));
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
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="//movies/:movieId" element={<MovieDetailsPage />}>
                  <Route index element={<Navigate to="video" replace />} />
                  <Route path="video" element={<MovieVideo />} />
                  <Route path="cast" element={<MovieCast />} />
                  <Route path="reviews" element={<MovieReviews />} />
                </Route>
              </Routes>
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
