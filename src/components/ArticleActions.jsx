import Button from "./Buttons";
import { useNavigate } from "react-router-dom";
export default function ArticleActions({ article, currentUser }) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/articles/${article.slug}/edit`);
  };
  const handleDelete = async () => {
    const confirmDelete = window.confirm("do you want to delete this article?");
    if (confirmDelete) {
      const response = await fetch(
        `https://realworld.habsida.net/api/articles/${article.slug}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        },
      );
      if (!response.ok) {
        alert("Failed to delete the article. Try again please.");
        console.error("Failed to delete the article:", response.status);
        return;
      } else {
        setTimeout(() => {
          window.alert("Article deleted successfully✅");
        }, 500);
        navigate("/");
      }
    }
  };

  function AddFavoriteArticle() {
    return <Button className="favorite-article-btn">Favorite article</Button>;
  }
  function editOwnArticle() {
    return (
      <>
        <Button className="edit-btn" onClick={handleEdit}>
          Edit
        </Button>
        <Button className="delete-btn" onClick={handleDelete}>
          Delete
        </Button>
      </>
    );
  }
  const isAuthor = article.author.username === currentUser?.username;

  return isAuthor ? editOwnArticle() : AddFavoriteArticle();
}
