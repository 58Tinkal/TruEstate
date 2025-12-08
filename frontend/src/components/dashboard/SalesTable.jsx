export default function SalesTable({ data, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center text-sm text-gray-500">
        Loading…
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center text-sm text-gray-500">
        No transactions found for current filters.
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    } catch {
      return String(dateString).slice(0, 10);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-[11px] text-gray-600 font-medium">
              <th className="px-4 py-3 whitespace-nowrap">Transaction ID</th>
              <th className="px-4 py-3 whitespace-nowrap">Date</th>
              <th className="px-4 py-3 whitespace-nowrap">Customer ID</th>
              <th className="px-4 py-3 whitespace-nowrap">Customer Name</th>
              <th className="px-4 py-3 whitespace-nowrap">Phone Number</th>
              <th className="px-4 py-3 whitespace-nowrap">Gender</th>
              <th className="px-4 py-3 whitespace-nowrap">Age</th>
              <th className="px-4 py-3 whitespace-nowrap">Region</th>
              <th className="px-4 py-3 whitespace-nowrap">Product Category</th>
              <th className="px-4 py-3 whitespace-nowrap">Quantity</th>
              <th className="px-4 py-3 whitespace-nowrap">Payment Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-[11px] bg-white">
            {data.map((row, idx) => (
              <tr
                key={`${row.transactionId || idx}-${row.customerId || idx}`}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {row.transactionId || "-"}
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {formatDate(row.date)}
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {row.customerId || "-"}
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {row.customerName || "-"}
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {row.phoneNumber || "-"}
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {row.gender || "-"}
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {row.age || "-"}
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {row.customerRegion || "-"}
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {row.productCategory || "-"}
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {row.quantity || 0}
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                  {row.paymentMethod || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
