import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
export default function useArticles(currentPage) {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { limitArticles } = useOutletContext();
  useEffect(() => {
    async function loadData() {
      
      setLoading(true);

      const offset = (currentPage - 1) * limitArticles;
      try {
        const response = await fetch(
          `https://realworld.habsida.net/api/articles?limit=${limitArticles}&offset=${offset}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles);
        console.log(data.articles);
        setArticlesCount(data.articlesCount);
      } catch (error) {
        setError("Error happened! Cant download data!");
        console.error(error);
      } finally {
        setLoading(false);
      }
      setError("");
    }

    loadData();
  }, [currentPage, limitArticles]);

  return {
    articlesCount,
    articles,
    loading,
    error,
  };
}
