import Container from "../components/Container.jsx";
import { useState } from "react";
import useFetch from "../hooks/useFetch.jsx";
import useDebounce from "../hooks/useDebounce.jsx";
import Loader from "../components/Loader.jsx";
import { Link, Navigate } from "react-router";

const Search = () => {
  const [inputValue, setInputValue] = useState("One Piece");
  const debounce = useDebounce(inputValue);
  const { responseData: searchData, loading: searchLoading, err: searchErr } = useFetch(`https://api.amvstr.me/api/v1/search?q=${debounce}`);
  return (
    <>
      <Container>
        <div className="m-2">
          <h2 className="text-xl font-bold">Search</h2>
        </div>
        <div className="m-2 mx-auto max-w-md">
          <input className="w-full rounded px-2 py-1 outline-none ring-2 ring-sky-500" type="text" name="search" placeholder="Search anime..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        </div>
        {searchLoading ? (
          <Loader />
        ) : searchErr ? (
          <Navigate to="/500" replace={true} />
        ) : searchData?.results?.length === 0 ? (
          <p className="my-4 text-center">No Results Found...</p>
        ) : (
          <div className="m-2 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5">
            {searchData?.results?.map((item, index) => (
              <div key={index} className="flex flex-col">
                <Link to={`/anime/${item.id}`}>
                  <figure>
                    <img loading="lazy" className="aspect-[2/3] w-full rounded transition-transform duration-150 hover:scale-95" src={item.image_url} alt={`${item.title} Episode ${item.episode}`} />
                  </figure>
                </Link>
                <div className="my-1 truncate">
                  <Link className="underline-offset-2 hover:underline" to={`/anime/${item.id}`}>
                    {item.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Search;