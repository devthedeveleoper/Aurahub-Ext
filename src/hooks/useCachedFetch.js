import { useEffect, useState } from 'react';

const CACHE_TIME = 15 * 60 * 1000; // 15 minutes

export default function useCachedFetch(key, url) {
  const [data, setData] = useState(null);
  const [isFresh, setIsFresh] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem(key);
    const timestamp = localStorage.getItem(`${key}_time`);
    const now = Date.now();

    if (cached && timestamp && now - Number(timestamp) < CACHE_TIME) {
      setData(JSON.parse(cached));
    } else {
      fetch(url)
        .then(res => res.json())
        .then(json => {
          localStorage.setItem(key, JSON.stringify(json));
          localStorage.setItem(`${key}_time`, now.toString());
          setData(json);
        })
        .catch(setError);
    }
  }, [key, url]);

  return { data, error, isFresh };
}
