import useSalesQueryState from "../hooks/useSalesQueryState";
import useSalesData from "../hooks/useSalesData";
import TopBar from "../components/dashboard/TopBar";
import SummaryCards from "../components/dashboard/SummaryCards";
import SalesTable from "../components/dashboard/SalesTable";
import Pagination from "../components/dashboard/Pagination";

export default function Dashboard() {
  const { state: query, update } = useSalesQueryState();
  const { data, summary, meta, loading, error } = useSalesData(query);

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">
          Sales Management System
        </h1>
      </header>

      <TopBar query={query} update={update} />

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
