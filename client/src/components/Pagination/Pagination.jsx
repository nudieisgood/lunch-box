import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

import { useNavigate, useLocation } from "react-router-dom";

const Pagination = ({ totalPages, currentPage }) => {
  const { search, pathname } = useLocation();

  const navigate = useNavigate();

  const handlePageChange = (pageNum) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("currentPage", pageNum);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button
        className="pagination__btn"
        onClick={() => {
          let goToPage = currentPage - 1;
          if (goToPage < 1) {
            goToPage = 1;
          }
          handlePageChange(goToPage);
        }}
      >
        <HiChevronDoubleLeft />
      </button>

      {pages.map((page) => {
        return (
          <button
            className={`${
              page === currentPage
                ? "pagination__btn pagination__btn--active"
                : "pagination__btn"
            }`}
            onClick={() => {
              handlePageChange(page);
            }}
            key={page}
          >
            {page}
          </button>
        );
      })}

      <button
        className="pagination__btn"
        onClick={() => {
          let goToPage = currentPage + 1;
          if (goToPage > totalPages) {
            goToPage = totalPages;
          }
          handlePageChange(goToPage);
        }}
      >
        <HiChevronDoubleRight />
      </button>
    </div>
  );
};
export default Pagination;
