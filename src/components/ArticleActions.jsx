import Button from "./Buttons";

export default function ArticleActions({ isLoggedIn }) {
  function AddFavoriteArticle() {
    return <Button className="favorite-article-btn">Favorite article</Button>;
  }
  function editOwnArticle() {
    return (
      <>
        <Button className="edit-btn">Edit</Button>
        <Button className="delete-btn">Delete</Button>
      </>
    );
  }
  return isLoggedIn ? editOwnArticle() : AddFavoriteArticle();
}
