import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import UserFrame from "./components/UserFrame";
import ArticlesPages from "./navigation/ArticlesPages";
import Article from "./navigation/Article";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NewPost from "./components/NewPost";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
import Settings from "./components/Settings";
import Profile from "./components/Profile";

function ArticlesLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      return;
    }
    const loadCurrentUser = async () => {
      const response = await fetch("https://realworld.habsida.net/api/user", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log("Current user status:", response.status);
      const data = await response.json();

      if (!response.ok) {
        localStorage.removeItem("userToken");
        setCurrentUser(null);
        setIsLoggedIn(false);
        return;
      }
      setCurrentUser(data.user);
      setIsLoggedIn(true);
    };
    loadCurrentUser();
    console.log("Saved Token is exists:", Boolean(token));
  }, []);

  return (
    <>
      <nav>
        <UserFrame
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
        ></UserFrame>
      </nav>
      <Outlet
        context={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
      ></Outlet>
    </>
  );
}
function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <ArticlesLayout></ArticlesLayout>,
        children: [
          {
            index: true,
            element: <ArticlesPages></ArticlesPages>,
          },
          {
            path: "sign-in",
            element: <SignIn></SignIn>,
          },
          {
            path: "sign-up",
            element: <SignUp></SignUp>,
          },
          {
            path: "new-post",
            element: <NewPost></NewPost>,
          },
          {
            path: "settings",
            element: <Settings></Settings>,
          },
          {
            path: "profile",
            element: <Profile></Profile>,
          },
          {
            path: "",
          },
          {
            path: "article/:slug",
            element: <Article></Article>,
          },
          {
            path: "*",
            element: <NotFound></NotFound>,
          },
        ],
      },
    ],
    {
      basename: "/SimpleBlogWithReact-4.13",
    },
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
