import { useState } from "react";
import like from "../images/like.svg";
import favorite from "../images/favorite.svg";
import Button from "./Buttons";
export default function LikeBtn({ favoritesCount, isLoggedIn }) {
  const [likesCount, setLikesCount] = useState(favoritesCount);
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    const nextLike = !isLiked;
    setIsLiked(nextLike);
    setLikesCount((prevLikesCount) =>
      nextLike ? prevLikesCount + 1 : prevLikesCount - 1,
    );
  };

  function forUser() {
    return (
      <div>
        <Button className="like-btn" onClick={handleLike}>
          <img src={isLiked ? favorite : like} alt="like" title="like icon" />
          <span>{likesCount}</span>
        </Button>
      </div>
    );
  }

  function forGuest() {
    return (
      <div>
        <Button className="like-btn">
          <img src={like} alt="like" title="like icon" />
          <span>{likesCount}</span>
        </Button>
      </div>
    );
  }

  return isLoggedIn ? forUser() : forGuest();
}
