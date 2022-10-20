import { useCallback, useState } from "react";

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await res.json();
      applyData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [requestConfig, applyData]);
  return {
    isLoading: isLoading,
    error: error,
    sendRequest: getMovies,
  };
};

export default useHttp;
