import { useState } from "react";
import LikeIcon from "../images/likeIcon.png";
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

  function foUser() {
    return (
      <>
        <div>
          <button className="like-btn" onClick={handleLike}>
            <img
              className={isLiked ? "red-like" : "green-like"}
              src={LikeIcon}
              alt=""
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
            <img className="green-like" src={LikeIcon} alt="" />
            <span>{likesCount}</span>
          </div>
        </div>
      </>
    );
  }

  return isLoggedIn ? foUser() : forGuest();
}
