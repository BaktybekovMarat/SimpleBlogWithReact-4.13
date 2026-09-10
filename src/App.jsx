import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import UserFrame from "./components/UserFrame";
import ArticlesPages from "./navigation/ArticlesPages";
import Article from "./navigation/Article";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NewArticle from "./components/NewArticle";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import EditArticle from "./components/EditArticle";

function ArticlesLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(() =>
    Boolean(localStorage.getItem("userToken")),
  );
  const limitArticles = 10;

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      return;
    }
    const loadCurrentUser = async () => {
      try {
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
          throw new Error("HTTP error", response.status);
        }
        setCurrentUser(data.user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsAuthLoading(false);
      }
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
        context={{
          isLoggedIn,
          setIsLoggedIn,
          currentUser,
          setCurrentUser,
          limitArticles,
          isAuthLoading,
        }}
      ></Outlet>
    </>
  );
}
function App() {
  const router = createBrowserRouter([
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
          path: "new-article",
          element: (
            <PrivateRoute>
              <NewArticle></NewArticle>
            </PrivateRoute>
          ),
        },
        {
          path: "settings",
          element: (
            <PrivateRoute>
              <Settings></Settings>
            </PrivateRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <PrivateRoute>
              <Profile></Profile>
            </PrivateRoute>
          ),
        },
        {
          path: "article/:slug",
          element: (
            <PrivateRoute>
              <Article></Article>
            </PrivateRoute>
          ),
        },
        {
          path: "articles/:slug/edit",
          element: (
            <PrivateRoute>
              <EditArticle></EditArticle>
            </PrivateRoute>
          ),
        },
        {
          path: "*",
          element: <NotFound></NotFound>,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
