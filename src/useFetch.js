import axios from "axios";
import { useEffect, useState } from "react";

import React from "react";

function useFetch(url, sendData) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(url, sendData);
  }, [url]);

  const fetchData = async (url, method, iid) => {
    setLoading(true);
    await axios({
      method: method,
      url: `${url}`,
      withCredentials: true,
      data: {
        userId: iid,
      },
    })
      .then((res) => {
        setLoading(false);
        setError(null);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };
  return { data, loading, error };
}

export default useFetch;
