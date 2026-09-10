import { useState } from "react";
import like from "../images/like.svg";
import favorite from "../images/favorite.svg";
import Button from "./Buttons";

export default function LikeBtn({
  favoritesCount,
  isLoggedIn,
  favorited,
  slug,
}) {
  const [likesCount, setLikesCount] = useState(favoritesCount);
  const [isLiked, setIsLiked] = useState(favorited);
  const handleLike = async () => {
    const nextLike = !isLiked;
    try {
      const response = await fetch(
        `https://realworld.habsida.net/api/articles/${slug}/favorite`,
        {
          method: nextLike ? "POST" : "DELETE",
          headers: {
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        },
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      console.log(result.article.favorited, result.article.favoritesCount);
      setIsLiked(result.article.favorited);
      setLikesCount(result.article.favoritesCount);
    } catch (error) {
      console.error(error);
    }
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
