import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import ServerError from "./pages/ServerError.jsx";
import NotFound from "./pages/NotFound.jsx";
import Popular from "./pages/Popular.jsx";
import Movies from "./pages/Movies.jsx";
import Search from "./pages/Search.jsx";
import Watch from "./pages/Watch.jsx";
import Anime from "./pages/Anime.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/search" element={<Search />} />
            <Route path="/anime/:slug" element={<Anime />} />
            <Route path="/watch/:slug" element={<Watch />} />
          </Route>
          <Route path="/500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;