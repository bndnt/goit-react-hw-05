import css from "./App.module.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Navigation from "../../components/Navigation/Navigation";
import HomePage from "../../pages/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";

function App() {
  return (
    <div>
      <header className={css.header}>
        <div className={css.container}>
          <Navigation />
        </div>
      </header>
      <main className={css.main}>
        <div className={css.container}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
