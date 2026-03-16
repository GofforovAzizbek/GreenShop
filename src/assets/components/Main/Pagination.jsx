import React from "react";

function getPageNumbers(current, total) {
  const pages = [];
  const start = Math.max(1, current - 2);
  const end = Math.min(total, current + 2);
  for (let i = start; i <= end; i += 1) pages.push(i);
  if (start > 1) pages.unshift(1);
  if (start > 2) pages.splice(1, 0, "...");
  if (end < total) pages.push("...");
  if (end < total - 1) pages.splice(pages.length - 1, 0, total);
  return pages;
}

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);

  return (
    <nav className="mt-8 flex items-center justify-center gap-2 text-sm">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((item, idx) =>
        item === "..." ? (
          <span key={`sep-${idx}`} className="px-2 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`rounded-lg px-4 py-2 ${
              item === page
                ? "border border-green-600 bg-green-50 text-green-700"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}
