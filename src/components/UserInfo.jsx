import user from "../images/user.svg";
import { format } from "date-fns";
export default function UserInfo({ author, createdAt }) {
  const date = format(new Date(createdAt), "d MMMM, yyyy")

  return (
    <div className="author-container">
      <img className="author-img" src={author?.image || user} alt="user" title="user icon" />
      <div className="author-info">
        <strong>{author.username}</strong>
        <p>{date}</p>
      </div>
    </div>
  );
}
