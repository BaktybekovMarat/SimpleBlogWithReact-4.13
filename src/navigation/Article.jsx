import { useEffect, useState } from "react";
import UserInfo from "../components/UserInfo";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ArticleActions from "../components/ArticleActions";
export default function Article() {
  const { currentUser } = useOutletContext();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { slug } = useParams();

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true);
        setErrorMessage("");
        const response = await fetch(
          `https://realworld.habsida.net/api/articles/${slug}`,
          {
            headers: {
              Authorization: currentUser
                ? `Token ${localStorage.getItem("userToken")}`
                : "",
            },
          },
        );
        if (!response.ok) {
          if (response.status === 404) {
            navigate("/profile");
            return;
          }
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setArticle(data.article);
      } catch (error) {
        console.error(error);
        setErrorMessage("Cant download articles. Try again later");
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [slug, navigate, currentUser]);
  if (errorMessage) {
    return <p className="form-errors">{errorMessage}</p>;
  }
  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <>
      <div className="article-container">
        <div className="article-text">
          <h2 className="article-title">{article.title}</h2>
          <UserInfo
            author={article.author}
            createdAt={article.createdAt}
          ></UserInfo>
        </div>
      </div>
      <div className="description">
        <p className="article-description">{article.body}</p>
        <div className="tags">
          {article.tagList.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="author-and-favorite-btn">
        <UserInfo
          author={article.author}
          createdAt={article.createdAt}
        ></UserInfo>
        <ArticleActions
          currentUser={currentUser}
          article={article}
        ></ArticleActions>
      </div>
    </>
  );
}
