import { useEffect, useState } from "react";
import UserInfo from "../components/UserInfo";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import FavoriteButton from "../buttons/Favorite-userSettingButton";
export default function Article() {
  const [article, setArticle] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    async function loadArticle() {
      const requestArticle = await fetch(
        `https://realworld.habsida.net/api/articles/${slug}`,
      );
      if (!requestArticle.ok) {
        throw new Error(`HTTP error: ${requestArticle.status}`);
      }
      const data = await requestArticle.json();
      setArticle(data.article);
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
        <FavoriteButton></FavoriteButton>
      </div>
      
    </div>
  );
}
