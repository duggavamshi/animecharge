import { useState } from "react";
import useFetch from "../hooks/useFetch.jsx";
import Loader from "../components/Loader.jsx";
import { Link, Navigate } from "react-router";
import Container from "../components/Container.jsx";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { responseData: moviesData, loading: moviesLoading, err: moviesErr } = useFetch(`https://api.amvstr.me/api/v1/movies?p=${page}`);
  return (
    <>
      <Container>
        <div className="m-2">
          <h2 className="text-xl font-bold">Movies #{page}</h2>
        </div>
        {moviesLoading ? (
          <Loader />
        ) : moviesErr ? (
          <Navigate to="/500" replace={true} />
        ) : (
          <div className="m-2 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5">
            {moviesData?.results?.map((item, index) => (
              <div key={index} className="flex flex-col">
                <Link to={`/anime/${item.id}`}>
                  <figure>
                    <img loading="lazy" className="aspect-[2/3] w-full rounded transition-transform duration-150 hover:scale-95" src={item.image_url} alt={`${item.title} Episode ${item.episode}`} />
                  </figure>
                </Link>
                <div className="flex flex-col px-1">
                  <div className="my-1 truncate">
                    <Link className="underline-offset-2 hover:underline" to={`/anime/${item.id}`}>
                      {item.title}
                    </Link>
                  </div>
                  <div className="flex justify-between">
                    <span className="rounded border border-white border-opacity-50 px-1 text-xs">{item.released}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="m-2 flex items-center justify-center gap-4">
          <button className="rounded border-2 border-sky-500 p-1" disabled={page < 2} onClick={() => setPage(page - 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <span className="rounded border-2 border-sky-500 px-1">{page}</span>
          <button className="rounded border-2 border-sky-500 p-1" onClick={() => setPage(page + 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </Container>
    </>
  );
};

export default Movies;