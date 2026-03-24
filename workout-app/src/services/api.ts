const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default API_URL;