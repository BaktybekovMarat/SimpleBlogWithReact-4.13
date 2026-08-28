import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import UserFrame from "./components/UserFrame";
import ArticlesPages from "./navigation/ArticlesPages";
import Article from "./navigation/Article";
import SignIn from "./components/SignIn";
import NotFound from "./components/NotFound";
function ArticlesLayout() {
  return (
    <>
      <nav>
        <UserFrame></UserFrame>
      </nav>
      <Outlet></Outlet>
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
            path: "signin",
            element: <SignIn></SignIn>,
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
