import newPost from "../images/newPost.svg";
import settings from "../images/settings.svg";
import userIcon from "../images/userIcon.svg";
import { Link } from "react-router-dom";

export default function UserFrame({ isLoggedIn, currentUser }) {
  function signUp() {
    return (
      <div>
        <div className="header">
          <h3 className="logo">RealWorld Blog</h3>
          <Link className="link" to="/">
            <span className="header-items home">Home</span>
          </Link>
          <Link className="link" to="/sign-in">
            <span className="header-items sign-in">Sign in</span>
          </Link>
          <Link className="link" to="/sign-up">
            <span className="header-items sign-up">Sign Up</span>
          </Link>
        </div>
      </div>
    );
  }
  function signIn() {
    return (
      <div>
        <div className="header">
          <h3 className="logo">RealWorld Blog</h3>
          <Link className="link" to="/">
            <span className="header-items home">Home</span>
          </Link>

          <Link className="link" to="/new-post">
            <img className="header-img" src={newPost} alt="new post" title="new post icon" />
            <span className="header-items sing-in">New Post</span>
          </Link>

          <Link className="link" to="/settings">
            <img
              className="header-img"
              src={settings}
              alt="settings"
              title="settings icon"
            />
            <span className="header-items sign-in">Settings</span>
          </Link>

          <Link className="link" to="/profile">
            <img
              className="header-img"
              src={userIcon}
              alt="user"
              title="user icon"
            />
            <span className="header-items sign-up">
              {currentUser === null ? "Profile" : currentUser.username}
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return isLoggedIn ? signIn() : signUp();
}
