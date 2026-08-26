import { useState, useEffect } from "react";
export default function useArticles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const response = await fetch(
          "https://realworld.habsida.net/api/articles?limit=4&offset=0",
        );
        const data = await response.json();
        console.log(data.articles)
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        setArticles(data.articles);
      } catch (error) {
        setError("Error happened! Cant download data!");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return {
    articles,
    loading,
    error,
  };
}
