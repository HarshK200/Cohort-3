import { useState, useEffect } from "react";

// custom hook
function useFetch(url, method) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  async function getData() {
    const response = await fetch(url, { method: method });
    const parsedResponse = await response.json();

    setData(parsedResponse);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, [url]);

  useEffect(() => {
    const intervalID = setInterval(getData, 10 * 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return { data, loading };
}

export { useFetch };
