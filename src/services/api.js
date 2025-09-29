import axios from "axios";
// API Read Access Token
// eyJhbGciOiJIUzI1NiJ9
//   .eyJhdWQiOiIwYzdjYjJlOWZlOTIyYzg5OTMwYzhjMjI4OWMyMTc3MCIsIm5iZiI6MTc1OTEwNTU2Ny44MDgsInN1YiI6IjY4ZDlkMjFmNmMzNjViOTcwZDUzMDcxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ
//   .qCi9K9suX_LqaMMpjDgUuoAvpBSN_0dNoK3EtCLpNpU
const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
const options = {
  headers: {
    // Замість api_read_access_token вставте свій токен
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzdjYjJlOWZlOTIyYzg5OTMwYzhjMjI4OWMyMTc3MCIsIm5iZiI6MTc1OTEwNTU2Ny44MDgsInN1YiI6IjY4ZDlkMjFmNmMzNjViOTcwZDUzMDcxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qCi9K9suX_LqaMMpjDgUuoAvpBSN_0dNoK3EtCLpNpU",
  },
};

export const RequestPopularMovies = async () => {
  const { data } = await axios.get(url, options);
  return data;
};

export const RequestSingleMovieById = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );
  return data;
};
export const RequestCastMovieById = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options
  );
  return data;
};
