export default function SalesTable({ data, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center text-sm text-gray-500">
        Loading…
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center text-sm text-gray-500">
        No transactions found for current filters.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="min-w-full text-xs">
        <thead className="bg-gray-50 border-b">
          <tr className="text-left text-[11px] text-gray-500">
            <th className="px-4 py-2">Transaction ID</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Customer ID</th>
            <th className="px-4 py-2">Customer name</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Gender</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Product Category</th>
            <th className="px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-[11px]">
          {data.map((row) => (
            <tr key={`${row.transactionId}-${row.customerId}`}>
              <td className="px-4 py-2 text-gray-700">{row.transactionId}</td>
              <td className="px-4 py-2 text-gray-700">
                {row.date ? row.date.slice(0, 10) : "-"}
              </td>
              <td className="px-4 py-2 text-gray-700">{row.customerId}</td>
              <td className="px-4 py-2 text-gray-700">{row.customerName}</td>
              <td className="px-4 py-2 text-gray-700">{row.phoneNumber}</td>
              <td className="px-4 py-2 text-gray-700">{row.gender}</td>
              <td className="px-4 py-2 text-gray-700">{row.age}</td>
              <td className="px-4 py-2 text-gray-700">{row.productCategory}</td>
              <td className="px-4 py-2 text-gray-700">{row.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
