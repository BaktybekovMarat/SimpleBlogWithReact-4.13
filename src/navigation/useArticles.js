import { useState, useEffect } from "react";
export default function useArticles(currentPage) {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const limit = 4;
      const offset = (currentPage - 1) * limit;
      try {
        const response = await fetch(
          `https://realworld.habsida.net/api/articles?limit=4&offset=${offset}`,
        );
        const data = await response.json();
        console.log(data.articles);

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
  }, [currentPage]);

  return {
    articles,
    loading,
    error,
  };
}
