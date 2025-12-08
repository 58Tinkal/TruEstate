function formatCurrency(v) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(v || 0);
}

export default function SummaryCards({ summary, loading }) {
  const s = summary || { totalUnits: 0, totalAmount: 0, totalDiscount: 0 };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
      <div className="card">
        <div className="text-xs text-gray-500 mb-1">Total units sold</div>
        <div className="text-2xl font-semibold">
          {loading ? "…" : s.totalUnits}
        </div>
      </div>

      <div className="card">
        <div className="text-xs text-gray-500 mb-1">Total Amount</div>
        <div className="text-lg font-semibold">
          {loading ? "…" : formatCurrency(s.totalAmount)}
        </div>
      </div>

      <div className="card">
        <div className="text-xs text-gray-500 mb-1">Total Discount</div>
        <div className="text-lg font-semibold">
          {loading ? "…" : formatCurrency(s.totalDiscount)}
        </div>
      </div>
    </div>
  );
}
