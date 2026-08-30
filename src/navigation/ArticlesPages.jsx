import UserInfo from "../components/UserInfo";
import Pagination from "../components/PaginationBar";
import LikeBtn from "../components/LikeBtn";
import { Link } from "react-router-dom";
import useArticles from "./useArticles";
import Loader from "../components/Loader";
import Banner from "../components/BannerDefault";
import { useState } from "react";

export default function ArticlePages() {
  const [currentPage, setCurrentPage] = useState(1);
  const { articlesCount, articles, loading, error } = useArticles(currentPage);

  if (loading && articles.length === 0) {
    return (
      <div>
        <h2 className="loader-text">Loading...</h2>
        <Loader></Loader>
      </div>
    );
  }

  if (error) {
    return (
      <p
        style={{
          fontSize: "40px",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "red",
        }}
      >
        {error}
      </p>
    );
  }

  return (
    <div>
      <Banner></Banner>
      <div className="main-container">
        <div className="main">
          <div className="item1 main-items">
            <h3>Popular tags</h3>
            <div className="tags">
              <span>one</span>
              <span>something</span>
              <span>chinese</span>
              <span>english</span>
              <span>french</span>
            </div>
          </div>
          {articles.map((article) => (
            <div className="item2 main-items" key={article.slug}>
              <div className="user-like-container">
                <UserInfo
                  author={article.author}
                  createdAt={article.createdAt}
                ></UserInfo>
                <LikeBtn
                  favorited={article.favorited}
                  favoritesCount={article.favoritesCount}
                ></LikeBtn>
              </div>
              <div className="main-content">
                <Link to={`/article/${article.slug}`}>
                  <h2>{article.title}</h2>
                </Link>
                <p className="article-description">{article.description}</p>
                <div className="tags">
                  {article.tagList.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          articlesCount={articlesCount}
        ></Pagination>
      </div>
    </div>
  );
}
