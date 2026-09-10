import { useOutletContext } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import Pagination from "../components/PaginationBar";
import LikeBtn from "../components/LikeBtn";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import OwnBannerInfo from "./OwnBannerInfo";
import Loader from "./Loader";
export default function Profile() {
  const { currentUser, isLoggedIn, limitArticles } = useOutletContext();
  const [myArticles, setMyArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    async function loadArticles() {
      try {
        setErrorMessage("");
        const response = await fetch(
          `https://realworld.habsida.net/api/articles?author=${currentUser.username}&limit=${limitArticles}&offset=${(currentPage - 1) * limitArticles}`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("userToken")}`,
            },
          },
        );

        if (!response.ok) {
          console.log("Error fetching articles:", response.status);
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setMyArticles(data.articles);
        setArticlesCount(data.articlesCount);
      } catch (error) {
        console.error(error);
        setErrorMessage("Cant download your articles. Try again later");
      }
    }
    loadArticles();
  }, [
    currentUser,
    currentPage,
    setMyArticles,
    setArticlesCount,
    limitArticles,
  ]);
  if (errorMessage) {
    return <p className="server-errors">{errorMessage}</p>;
  }
  if (!myArticles) return <Loader></Loader>;
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
          {myArticles.map((article) => (
            <div className="item2 main-items" key={article.slug}>
              <div className="user-like-container">
                <UserInfo
                  author={article.author}
                  createdAt={article.createdAt}
                ></UserInfo>
                <LikeBtn
                  favoritesCount={article.favoritesCount}
                  isLoggedIn={isLoggedIn}
                  slug={article.slug}
                  favorited={article.favorited}
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
          limitArticles={limitArticles}
        ></Pagination>
      </div>
    </>
  );
}
