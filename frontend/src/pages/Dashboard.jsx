import useSalesQueryState from "../hooks/useSalesQueryState";
import useSalesData from "../hooks/useSalesData";
import TopBar from "../components/dashboard/TopBar";
import SummaryCards from "../components/dashboard/SummaryCards";
import SalesTable from "../components/dashboard/SalesTable";
import Pagination from "../components/dashboard/Pagination";

export default function Dashboard() {
  const { state: query, update } = useSalesQueryState();
  const { data, summary, meta, loading, error } = useSalesData(query);

  const resetAll = () => {
    update({
      search: "",
      regions: [],
      genders: [],
      ageMin: "",
      ageMax: "",
      categories: [],
      tags: [],
      paymentMethods: [],
      startDate: "",
      endDate: "",
      sortBy: "date",
      sortOrder: "desc",
      page: 1,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={resetAll}
            className="px-3 py-1.5 text-xs bg-indigo-600 text-white border border-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center gap-2"
            type="button"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
          <h1 className="text-lg font-semibold">
            Sales Management System
          </h1>
        </div>
      </header>

      <TopBar query={query} update={update} loading={loading} />

      {error && (
        <div className="mb-2 text-xs text-red-500">
          {error}
        </div>
      )}

      <SummaryCards summary={summary} loading={loading} />

      <SalesTable data={data} loading={loading} />

      <Pagination
        meta={meta}
        onChangePage={(page) => update({ page })}
      />
    </div>
  );
}
