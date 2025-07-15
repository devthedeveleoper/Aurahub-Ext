export const getCache = (key, maxAge = 15 * 60 * 1000) => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  const { data, timestamp } = JSON.parse(item);
  if (Date.now() - timestamp > maxAge) return null;
  return data;
};

export const setCache = (key, data) => {
  localStorage.setItem(
    key,
    JSON.stringify({ data, timestamp: Date.now() })
  );
};
