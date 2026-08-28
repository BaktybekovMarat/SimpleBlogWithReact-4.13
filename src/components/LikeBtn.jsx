import { useState } from "react";
import like from "../images/like.svg";
export default function LikeBtn({ favorited, favoritesCount }) {
  const [likesCount, setLikesCount] = useState(favoritesCount);
  const [isLiked, setIsLiked] = useState(favorited);
  const [isLoggedIn] = useState(false);
  const handleLike = () => {
    const nextLike = !isLiked;
    setIsLiked(nextLike);
    setLikesCount((prevLikesCount) =>
      nextLike ? prevLikesCount + 1 : prevLikesCount - 1,
    );
  };

  function forUser() {
    return (
      <>
        <div>
          <button className="like-btn" onClick={handleLike}>
            <img
              className={isLiked ? "red-like" : "green-like"}
              src={like}
              alt="like"
              title="like icon"
            />
            <span>{likesCount}</span>
          </button>
        </div>
      </>
    );
  }

  function forGuest() {
    return (
      <>
        <div>
          <div className="like-btn">
            <img className="green-like" src={like} alt="like" title="like icon" />
            <span>{likesCount}</span>
          </div>
        </div>
      </>
    );
  }

  return isLoggedIn ? forUser() : forGuest();
}
