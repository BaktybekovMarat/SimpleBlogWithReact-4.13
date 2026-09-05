import { useOutletContext } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import Pagination from "../components/PaginationBar";
import LikeBtn from "../components/LikeBtn";
import { Link } from "react-router-dom";
import useArticles from "../navigation/useArticles";
import { useState } from "react";
import OwnBannerInfo from "./OwnBannerInfo";
export default function Profile() {
  const { currentUser, isLoggedIn } = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  const { articlesCount, articles } = useArticles(currentPage);

  return (
    <>
      <OwnBannerInfo currentUser={currentUser}></OwnBannerInfo>
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
                  favoritesCount={article.favoritesCount}
                  isLoggedIn={isLoggedIn}
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
    </>
  );
}
