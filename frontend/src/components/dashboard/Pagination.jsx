export default function Pagination({ meta, onChangePage }) {
  if (!meta || meta.totalPages === 0) return null;

  const { page, totalPages, totalItems, pageSize } = meta;
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex justify-between items-center mt-4 text-xs">
      <div className="text-gray-500">
        Showing {startItem} to {endItem} of {totalItems} results
      </div>

      <div className="flex justify-center items-center gap-2">
        <button
          type="button"
          className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={page <= 1}
          onClick={() => onChangePage(page - 1)}
        >
          Previous
        </button>

        <div className="flex items-center gap-1 px-3">
          <span className="px-3 py-2 rounded-md border border-gray-300 bg-indigo-600 text-white font-medium">
            {page}
          </span>
          <span className="text-gray-500">of {totalPages}</span>
        </div>

        <button
          type="button"
          className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={page >= totalPages}
          onClick={() => onChangePage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
