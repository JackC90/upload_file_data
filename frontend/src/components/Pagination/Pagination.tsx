import { PaginationProps } from "@/types/pagination";
import { useState, useEffect } from "react";

const getPageArray = (
  totalPages: number,
  currentPage: number,
  interval: number = 3,
): Array<number> => {
  const first = Math.max(1, currentPage - interval);
  const last = Math.min(totalPages, currentPage + interval);
  const length = Math.max(1, last - first + 1);
  const list = Array(length);
  for (let i = 0; i < length; i++) {
    list[i] = first + i;
  }
  return list;
};

const Pagination = ({
  initialCurrentPage = 1,
  itemsPerPage = 10,
  total = 0,
  onChangePage,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(initialCurrentPage);

  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    const newOffset = (page - 1) * itemsPerPage;

    if (onChangePage) {
      onChangePage({
        page,
        offset: newOffset,
        limit: itemsPerPage,
      });
    }
  };

  useEffect(() => {
    handlePageChange(initialCurrentPage);
  }, [initialCurrentPage]);

  const offset = (currentPage - 1) * itemsPerPage;
  const pageList = getPageArray(totalPages, currentPage);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium mx-1">{offset + 1}</span>-
            <span className="font-medium mx-1">{offset + itemsPerPage}</span>
            of
            <span className="font-medium mx-1">{total}</span>
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {currentPage != 1 && (
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            )}

            {pageList.map((pageNumber) => {
              return (
                <button
                  onClick={() => handlePageChange(pageNumber)}
                  aria-current="page"
                  className={`relative inline-flex items-center px-4 py-2 text-sm ${pageNumber === currentPage ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"}`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {currentPage < totalPages && (
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="size-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
