export const searchFoods = async (query) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/foods?query=${encodeURIComponent(query)}`,
  );
  return res.json();
};
