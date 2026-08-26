import useArticles from "./useArticles";
import Loader from "../loader/Loader";
import Main from "../components/Main";
import Banner from "../components/BannerDefault";
export default function ArticlesPages() {
  const { articles, loading, error } = useArticles();
  if (loading) {
    return (
      <div>
        <h2 className="loader-text">Loading...</h2>
        <Loader></Loader>
      </div>
    );
  }
  if (error) {
    return <p style={{ color: "red", fontSize: "10px" }}>{error}</p>;
  }

  return (
    <>
    <Banner></Banner>
      <Main articles={articles}></Main>
    </>
  );
}
