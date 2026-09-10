import Button from "./Buttons";

export default function Pagination({
  currentPage,
  setCurrentPage,
  articlesCount,
  limitArticles,
}) {
  const totalPages =
    articlesCount > 0 ? Math.ceil(articlesCount / limitArticles) : 1;

  const prev = () => {
    setCurrentPage(currentPage - 1);
  };
  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  console.log("totalPages", totalPages);

  return (
    <div>
      <div className="pagination-container">
        <Button
          className="prev-next-btn"
          disabled={currentPage === 1}
          onClick={prev}
        >
          Prev
        </Button>
        <span className=" pagination-info">
          Page:
          {currentPage}
          of
          {totalPages}
        </span>
        <Button
          className="prev-next-btn"
          disabled={currentPage === totalPages}
          onClick={next}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
