import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <NavLink
        className={({ isActive }) => clsx(css.link, isActive && css.linkActive)}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => clsx(css.link, isActive && css.linkActive)}
        to="/movies"
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
