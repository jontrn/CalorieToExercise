const apiBaseUrl = import.meta.env.VITE_API_URL;

export const searchFoods = async (query) => {
  const res = await fetch(`${apiBaseUrl}/foods?query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error("Food search failed");
  }
  return res.json();
};

export const pingBackend = async () => {
  const res = await fetch(`${apiBaseUrl}/health`);
  if (!res.ok) {
    throw new Error("Backend health check failed");
  }
  return res.json();
};
