export default function Pagination({ meta, onChangePage }) {
  if (!meta) return null;

  const { page, totalPages } = meta;

  return (
    <div className="flex justify-center items-center gap-2 mt-4 text-xs">
      <button
        className="px-3 py-1 rounded-md border border-gray-300 bg-white disabled:opacity-50"
        disabled={page <= 1}
        onClick={() => onChangePage(page - 1)}
      >
        Prev
      </button>

      <div className="flex items-center gap-1">
        <span className="px-3 py-1 rounded-md border border-gray-300 bg-black text-white">
          {page}
        </span>
        <span className="text-gray-500">/ {totalPages}</span>
      </div>

      <button
        className="px-3 py-1 rounded-md border border-gray-300 bg-white disabled:opacity-50"
        disabled={page >= totalPages}
        onClick={() => onChangePage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
