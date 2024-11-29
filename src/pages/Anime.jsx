import { Link, Navigate, useParams } from "react-router";
import useFetch from "../hooks/useFetch.jsx";
import Container from "../components/Container.jsx";
import Loader from "../components/Loader.jsx";
import { useMemo } from "react";

const Anime = () => {
  const slug = useParams().slug;
  const { responseData: animeData, loading: animeLoading, err: animeErr } = useFetch(`https://api.amvstr.me/api/v1/info/${slug}`);
  const { responseData: epData, loading: epLoading, err: epErr } = useFetch(`https://api.amvstr.me/api/v1/episode/${slug}`);
  const sortEpisodes = useMemo(() => {
    return epData?.episodes?.sort((a, b) => a.episode - b.episode);
  }, [epData]);
  if (animeLoading || epLoading) {
    return <Loader />;
  }
  if (animeErr) {
    return <Navigate to="/500" replace={true} />;
  }
  return (
    <>
      <Container>
        <div className="m-3 flex flex-col md:flex-row">
          <figure className="flex-shrink-0">
            <img className="aspect-[2/3] w-60 rounded" src={animeData?.image_url} alt={animeData?.title} />
          </figure>
          <div className="flex flex-col md:ml-3">
            <div className="mb-3 max-md:my-3">
              <h1 className="text-2xl font-bold">{animeData?.title}</h1>
            </div>

            <p className="my-3 text-sm">{animeData?.synopsis}</p>

            <div className="mb-3">
              <div>
                <label className="text-secondary">Season</label>
                <div>{animeData?.season}</div>
              </div>
              <div>
                <label className="text-secondary">Status</label>
                <div>{animeData?.status}</div>
              </div>

              <div>
                <label className="text-secondary">Year</label>
                <div>{animeData?.released}</div>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="m-2">
          <h2 className="mb-3">Episodes</h2>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-6">
            {sortEpisodes?.map((item, index) => (
              <Link className="rounded border border-sky-500" to={`/watch/${item.id}`} key={index}>
                <button className="w-full px-2 py-1">Episode - {item.episode}</button>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Anime;