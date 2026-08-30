export default function Pagination({
  currentPage,
  setCurrentPage,
  articlesCount,
}) {
  const limitArticles = 4;
  const totalPages = Math.ceil(articlesCount / limitArticles);

  const prev = () => {
    setCurrentPage(currentPage - 1);
  };
  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className="pagination-container">
        <button
          className="prev-next-btn"
          disabled={currentPage === 1}
          onClick={prev}
        >
          Prev
        </button>
        <span className=" pagination-info">
          Page:
          {currentPage} 
          of
          {totalPages}
        </span>
        <button
          className="prev-next-btn"
          disabled={currentPage === totalPages}
          onClick={next}
        >
          Next
        </button>
      </div>
    </div>
  );
} 
