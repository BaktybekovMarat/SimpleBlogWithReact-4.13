import { useState } from "react";
import newpost from "../images/newpost.svg";
import setting from "../images/setting.svg";
import user from "../images/user.svg";
import { Link } from "react-router-dom";
export default function UserFrame() {
  const [isLoggedIn] = useState(false);
  function signUp() {
    return (
      <div>
        <div className="navbar">
          <h3 className="logo">Realworld Blog</h3>
          <Link to="/">
            <span className="navbar-items home">Home</span>
          </Link>
          <Link to="/signin">
            <span className="navbar-items sign-in">Sign in</span>
          </Link>
          <span className="navbar-items sign-up">Sign Up</span>
        </div>
      </div>
    );
  }
  function signIn() {
    return (
      <div>
        <div className="navbar">
          <h3 className="logo">Realworld Blog</h3>
          <span className="navbar-items home">Home</span>
          <img className="navbar-img" src={newpost} alt="new post" title="new post icon" />
          <span className="navbar-items sing-in">New Post</span>
          <img className="navbar-img" src={setting} alt="setting" title="setting icon" />
          <span className="navbar-items sign-in">Settings</span>
          <img className="navbar-img" src={user} alt="user" title="user icon" />
          <span className="navbar-items sign-up">Profile</span>
        </div>
      </div>
    );
  }

  return isLoggedIn ? signIn() : signUp();
}
