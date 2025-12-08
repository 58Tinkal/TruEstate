const FILTER_OPTIONS = {
  regions: ["North", "South", "East", "West"],
  genders: ["Male", "Female", "Other"],
  categories: ["Clothing", "Electronics", "Grocery", "Other"],
  tags: ["New", "Sale", "Premium", "Online"],
  paymentMethods: ["Cash", "Card", "UPI", "NetBanking"],
};

function MultiSelectDropdown({ label, values, options, onChange }) {
  return (
    <div className="relative">
      <select
        multiple
        className="border border-gray-300 rounded-full px-3 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[120px]"
        value={values}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions).map(
            (o) => o.value
          );
          onChange(selected);
        }}
      >
        <option disabled value="">
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function TopBar({ query, update }) {
  return (
    <div className="flex items-center justify-between mb-3">
      {/* Left: filters row */}
      <div className="flex flex-wrap items-center gap-2">
        <MultiSelectDropdown
          label="Customer Region"
          values={query.regions}
          options={FILTER_OPTIONS.regions}
          onChange={(v) => update({ regions: v })}
        />
        <MultiSelectDropdown
          label="Gender"
          values={query.genders}
          options={FILTER_OPTIONS.genders}
          onChange={(v) => update({ genders: v })}
        />
        {/* Age range */}
        <div className="flex items-center gap-1 text-xs">
          <span className="px-3 py-1 border border-gray-300 rounded-full bg-white">
            Age Range
          </span>
          <input
            type="number"
            placeholder="Min"
            value={query.ageMin}
            onChange={(e) => update({ ageMin: e.target.value })}
            className="w-16 border border-gray-300 rounded-md px-1 py-1 text-xs"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={query.ageMax}
            onChange={(e) => update({ ageMax: e.target.value })}
            className="w-16 border border-gray-300 rounded-md px-1 py-1 text-xs"
          />
        </div>
        <MultiSelectDropdown
          label="Product Category"
          values={query.categories}
          options={FILTER_OPTIONS.categories}
          onChange={(v) => update({ categories: v })}
        />
        <MultiSelectDropdown
          label="Tags"
          values={query.tags}
          options={FILTER_OPTIONS.tags}
          onChange={(v) => update({ tags: v })}
        />
        <MultiSelectDropdown
          label="Payment Method"
          values={query.paymentMethods}
          options={FILTER_OPTIONS.paymentMethods}
          onChange={(v) => update({ paymentMethods: v })}
        />
        {/* Date range */}
        <div className="flex items-center gap-1 text-xs">
          <span className="px-3 py-1 border border-gray-300 rounded-full bg-white">
            Date
          </span>
          <input
            type="date"
            value={query.startDate}
            onChange={(e) => update({ startDate: e.target.value })}
            className="border border-gray-300 rounded-md px-1 py-1 text-xs"
          />
          <span>-</span>
          <input
            type="date"
            value={query.endDate}
            onChange={(e) => update({ endDate: e.target.value })}
            className="border border-gray-300 rounded-md px-1 py-1 text-xs"
          />
        </div>
      </div>

      {/* Right: search + sort */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Name, Phone no."
          value={query.search}
          onChange={(e) => update({ search: e.target.value })}
          className="w-64 border border-gray-300 rounded-full px-3 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex items-center gap-1 text-xs">
          <span className="text-gray-500">Sort by:</span>
          <select
            value={query.sortBy}
            onChange={(e) => update({ sortBy: e.target.value })}
            className="border border-gray-300 rounded-full px-3 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="customerName">Customer Name (A–Z)</option>
            <option value="date">Date (Newest)</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>
      </div>
    </div>
  );
}
