import React, { useState, useEffect } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const maxPageButtons = isMobile ? 3 : 5;

  let startPage: number, endPage: number;
  if (totalPages <= maxPageButtons) {
    startPage = 1;
    endPage = totalPages;
  } else {
    startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
    endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

    if (currentPage > totalPages - Math.floor(maxPageButtons / 2)) {
      endPage = totalPages;
      startPage = Math.max(totalPages - maxPageButtons + 1, 1);
    }

    if (endPage - startPage < maxPageButtons - 1) {
      startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center justify-center space-x-1">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex items-center justify-center w-10 h-8 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="sr-only">←</span>
            </button>
          </li>
        )}

        {/* Dynamic Page Numbers */}
        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              onClick={() => handlePageChange(num)}
              className={`w-10 h-8 ${
                currentPage === num
                  ? "text-blue-600 bg-blue-50 border-blue-300"
                  : "text-gray-500 bg-white border border-gray-300"
              } rounded-lg hover:bg-gray-100 hover:text-gray-700`}
            >
              {num}
            </button>
          </li>
        ))}

        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center justify-center w-10 h-8 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span className="sr-only">→</span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
