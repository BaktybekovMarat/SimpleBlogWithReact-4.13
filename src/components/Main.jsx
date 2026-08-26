import UserInfo from "./UserInfo";
import Pagination from "./PaginationBar";
import LikeBtn from "../buttons/LikeBtn";
import { Link } from "react-router-dom";
export default function Main({ articles }) {
  return (
    <div>
      <div className="main-container">
        <div className="main">
          <div className="item1 main-items">
            <strong>Popular tags</strong>
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
        <Pagination></Pagination>
      </div>
    </div>
  );
}
