import { PAGE_SET_LENGTH } from "@/config/pagination";
import { AskMePages } from "@/types";

export default function Pagination({
  pages,
  handlePage,
}: {
  pages: AskMePages;
  handlePage: (pageNumber: number) => void;
}) {
  // if page is the last page then assign lastPage to pages.self
  const lastPage = pages.last ? pages.last : pages.self;

  const pageNumberOffest =
    Math.floor((pages.self - 1) / PAGE_SET_LENGTH) * PAGE_SET_LENGTH;
  const offsetToLastPage = lastPage - pageNumberOffest;
  const isFinalPagesSet = offsetToLastPage <= PAGE_SET_LENGTH;
  const pagesInSet = isFinalPagesSet ? offsetToLastPage : PAGE_SET_LENGTH;
  return (
    <div className="join">
      {pageNumberOffest != 0 && (
        <button
          onClick={() => handlePage(pageNumberOffest)}
          className="btn join-item"
        >
          «
        </button>
      )}
      {[...Array(pagesInSet)].map((_, i) => {
        const pageNumber = i + 1 + pageNumberOffest;
        return (
          <button
            key={i}
            onClick={() => handlePage(pageNumber)}
            className={`btn join-item ${
              pages.self == pageNumber && "btn-active"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
      {!isFinalPagesSet && (
        <button
          onClick={() => handlePage(pageNumberOffest + PAGE_SET_LENGTH + 1)}
          className="btn join-item"
        >
          »
        </button>
      )}
    </div>
  );
}
