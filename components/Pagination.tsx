import { AskMePages } from "@/types";

export default function Pagination({
  pages,
  handlePage,
}: {
  pages: AskMePages;
  handlePage: (pageNumber: number) => void;
}) {
  return (
    <div className="join">
      <button
        onClick={() => handlePage(pages.previous!)}
        className={`btn join-item ${!pages.first && "btn-disabled"}`}
      >
        «
      </button>
      <button className="btn join-item">{pages.self}</button>
      <button
        onClick={() => handlePage(pages.next || pages.last!)}
        className={`btn join-item ${!pages.last && "btn-disabled"}`}
      >
        »
      </button>
    </div>
  );
}
