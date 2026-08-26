import { useState } from "react";
import newPostIcon from "../images/newpost.png";
import settingsIcon from "../images/settings.png";
import userIcon from "../images/userIcon.png";


export default function UserFrame() {
  const [isLoggedIn] = useState(false);
  function signUp() {
    return (
      <div>
        <div className="navbar">
          <h3 className="logo"> Realworld Blog</h3>
          <span className="navbar-items home">Home</span>
          <span className="navbar-items sign-in">Sign in</span>
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
          <img className="navbar-img" src={newPostIcon} alt="" />
          <span className="navbar-items sing-in">New Post</span>
          <img className="navbar-img" src={settingsIcon} alt="" />
          <span className="navbar-items sign-in">Settings</span>
          <img className="navbar-img" src={userIcon} alt="" />
          <span className="navbar-items sign-up">Profile</span>
        </div>
      </div>
    );
  }

  return isLoggedIn ? signIn() : signUp();
}
