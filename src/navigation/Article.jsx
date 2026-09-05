import { useEffect, useState } from "react";
import UserInfo from "../components/UserInfo";
import { useOutletContext, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ArticleActions from "../components/ArticleActions";
export default function Article() {
  const {isLoggedIn} = useOutletContext();
  const [article, setArticle] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    async function loadArticle() {
      const articleResponse = await fetch(
        `https://realworld.habsida.net/api/articles/${slug}`,
      );
      if (!articleResponse.ok) {
        throw new Error(`HTTP error: ${articleResponse.status}`);
      }
      const articleData = await articleResponse.json();
      setArticle(articleData.article);
    }
    loadArticle();
  }, [slug]);

  if (!article) return <Loader></Loader>;

  return (
    <div>
      <div className="article-container">
        <div className="article-text">
          <h2>{article.slug}</h2>
          <UserInfo
            author={article.author}
            createdAt={article.createdAt}
          ></UserInfo>
        </div>
      </div>
      <div className="description">
        <p className="article-description">{article.description}</p>
        <div className="tags">
          {article.tagList.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="author-and-favorite-btn">
        <UserInfo author={article.author} createdAt={article.createdAt}>  </UserInfo>
        <ArticleActions isLoggedIn={isLoggedIn}></ArticleActions>
      </div>
      
    </div>
  );
}
