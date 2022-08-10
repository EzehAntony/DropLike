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

  const fetchData = async (url, sendData) => {
    setLoading(true);
    await axios({
      method: "GET",
      url: `${url}`,
      withCredentials: true,
      data: sendData,
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
