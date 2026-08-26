import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <p>The page you are looking for does not exist.</p>
      <Link className="goback-btn" to={"/"}>Back to home</Link>
    </div>
  );
}
