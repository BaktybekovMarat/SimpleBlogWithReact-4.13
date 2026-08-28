export default function Pagination({ currentPage, setCurrentPage }) {
  return (
    <div>
      <div className="pagination-container">
        <button
          className={
            currentPage === 1 ? "pagination-btn-active" : "pagination-btn"
          }
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>
        <button
          className={
            currentPage === 2 ? "pagination-btn-active" : "pagination-btn"
          }
          onClick={() => setCurrentPage(2)}
        >
          2
        </button>
        <button
          className={
            currentPage === 3 ? "pagination-btn-active" : "pagination-btn"
          }
          onClick={() => setCurrentPage(3)}
        >
          3
        </button>
        <button
          className={
            currentPage === 4 ? "pagination-btn-active" : "pagination-btn"
          }
          onClick={() => setCurrentPage(4)}
        >
          4
        </button>
        <button
          className={
            currentPage === 5 ? "pagination-btn-active" : "pagination-btn"
          }
          onClick={() => setCurrentPage(5)}
        >
          5
        </button>
        <button
          className={
            currentPage === 6 ? "pagination-btn-active" : "pagination-btn"
          }
          onClick={() => setCurrentPage(6)}
        >
          6
        </button>
      </div>
    </div>
  );
}
