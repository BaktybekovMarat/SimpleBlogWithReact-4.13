import { useState } from "react";

export default function FavoriteButton() {
  const [isLoggedIn] = useState(false);
  function favoriteButton() {
    return <button className="favorite-article-btn">Favorite article</button>;
  }
  function userSetting() {
    return (
      <>
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </>
    );
  }
  return isLoggedIn ? userSetting() : favoriteButton();
}
