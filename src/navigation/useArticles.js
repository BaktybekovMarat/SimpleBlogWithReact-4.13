import { useState, useEffect } from "react";
export default function useArticles(currentPage) {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const limit = 4;
      const offset = (currentPage - 1) * limit;
      try {
        const articlesResponse = await fetch(
          `https://realworld.habsida.net/api/articles?limit=4&offset=${offset}`,
        );
        const articlesData = await articlesResponse.json();

        if (!articlesResponse.ok) {
          throw new Error(`HTTP error: ${articlesResponse.status}`);
        }
        setArticles(articlesData.articles);
        console.log(articlesData.articles)
        setArticlesCount(articlesData.articlesCount);
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
    articlesCount,
    articles,
    loading,
    error,
  };
}
