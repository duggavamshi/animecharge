import { Link, Navigate, useParams } from "react-router";
import Container from "../components/Container.jsx";
import useFetch from "../hooks/useFetch.jsx";
import Loader from "../components/Loader.jsx";

const Watch = () => {
  const [id, epNum] = useParams().slug.split("-episode-");
  const { responseData: watchData, loading: watchLoading, err: watchErr } = useFetch(`https://api.amvstr.me/api/v2/stream/${id}/${epNum}`);

  return (
    <>
      <Container>
        {watchLoading ? (
          <Loader />
        ) : watchErr ? (
          <Navigate to="/500" replace={true} />
        ) : (
          <div className="m-2">
            <iframe className="aspect-video min-w-full" src={watchData?.iframe[1]?.iframe} allowFullScreen="true"></iframe>
          </div>
        )}
        <div className="m-2 flex items-center justify-center gap-4">
          <Link className="rounded border border-sky-500 p-2" to={`/anime/${id}`}>
            <button>All Episodes</button>
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Watch;