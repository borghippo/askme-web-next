import { AskMePages } from "@/types";
import { Dispatch, SetStateAction } from "react";

export default function Pagination({
  pages,
  handlePage,
}: {
  pages: AskMePages;
  handlePage: (pageNumber: number) => void;
}) {
  return (
    <div className="join">
      {pages.self != 1 && (
        <button onClick={() => handlePage(1)} className="btn join-item btn-md">
          1
        </button>
      )}
      {pages.previous && (
        <button
          onClick={() => handlePage(pages.previous!)}
          className="btn join-item btn-md"
        >
          {pages.previous}
        </button>
      )}
      <button
        onClick={() => handlePage(pages.self)}
        className="btn join-item btn-active btn-md"
      >
        {pages.self}
      </button>
      {pages.next && (
        <button
          onClick={() => handlePage(pages.next!)}
          className="btn join-item btn-md"
        >
          {pages.next}
        </button>
      )}
      {pages.last && (
        <button
          onClick={() => handlePage(pages.last!)}
          className="btn join-item btn-md"
        >
          {pages.last}
        </button>
      )}
    </div>
  );
}
