export default function UserInfo({ author, createdAt }) {
  return (
    <div className="author-container">
      <img className="author-img" src={author.image} alt="" />
      <div className="author-info">
        <strong>{author.username}</strong>
        <p>{createdAt}</p>
      </div>
    </div>
  );
}
