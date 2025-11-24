"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ pagination }) {
  const router = useRouter();
  const params = useSearchParams();

  if (!pagination || pagination.totalPages === 1) return null;

  const { page, totalPages, hasPrevPage, hasNextPage } = pagination;

  const handlePageChange = (newPage) => {
    const updatedParams = new URLSearchParams(params.toString());
    updatedParams.set("page", newPage);

    router.push("?" + updatedParams.toString());
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      {/* Prev Button */}
      <button
        disabled={!hasPrevPage}
        onClick={() => handlePageChange(page - 1)}
        className={`px-4 py-2 rounded-md border text-sm shadow-sm transition ${
          hasPrevPage
            ? "bg-[var(--color-input)] hover:bg-[var(--color-muted)]"
            : "opacity-40 cursor-not-allowed bg-[var(--color-input)]"
        }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`w-10 h-10 rounded-md border text-sm shadow-sm transition
              ${
                num === Number(page)
                  ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                  : "bg-[var(--color-input)] hover:bg-[var(--color-muted)]"
              }
            `}
          >
            {num}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        disabled={!hasNextPage}
        onClick={() => handlePageChange(page + 1)}
        className={`px-4 py-2 rounded-md border text-sm shadow-sm transition ${
          hasNextPage
            ? "bg-[var(--color-input)] hover:bg-[var(--color-muted)]"
            : "opacity-40 cursor-not-allowed bg-[var(--color-input)]"
        }`}
      >
        Next
      </button>
    </div>
  );
}
