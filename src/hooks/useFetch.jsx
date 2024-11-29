import { useEffect, useState } from "react";

const UseFetch = (url) => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const req = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await req.json();
        setResponseData(res);
      } catch (err) {
        setErr(err);
      }
    };
    fetchData().then(() => setLoading(false));
  }, [url]);

  return { responseData, loading, err };
};

export default UseFetch;