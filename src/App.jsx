import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import UserFrame from "./components/UserFrame";
import ArticlesPages from "./navigation/ArticlesPage";
import Article from "./navigation/Article";
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
          path: "/article/:slug",
          element: <Article></Article>,
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
