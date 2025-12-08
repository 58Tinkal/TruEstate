import MultiSelectDropdown from "./MultiSelectDropdown";

const FILTER_OPTIONS = {
  regions: ["North", "South", "East", "West"],
  genders: ["Male", "Female", "Other"],
  categories: ["Clothing", "Electronics", "Grocery", "Other"],
  tags: ["New", "Sale", "Premium", "Online"],
  paymentMethods: ["Cash", "Card", "UPI", "NetBanking"],
};

export default function TopBar({ query, update }) {
  const hasActiveFilters =
    query.regions.length > 0 ||
    query.genders.length > 0 ||
    query.ageMin ||
    query.ageMax ||
    query.categories.length > 0 ||
    query.tags.length > 0 ||
    query.paymentMethods.length > 0 ||
    query.startDate ||
    query.endDate ||
    query.search;

  const clearAllFilters = () => {
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
    });
  };

  return (
    <div className="space-y-3 mb-4">
      <div className="flex items-center gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={query.search}
          onChange={(e) => update({ search: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-56"
        />

        <MultiSelectDropdown
          label="Region"
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

        <div className="flex items-center gap-1 border border-gray-300 rounded-md px-2 py-1.5 bg-white">
          <span className="text-xs text-gray-500 whitespace-nowrap">Age:</span>
          <input
            type="number"
            placeholder="Min"
            value={query.ageMin}
            onChange={(e) => update({ ageMin: e.target.value })}
            className="w-16 border-0 border-b border-gray-300 px-1 py-0.5 text-xs focus:outline-none focus:ring-0 focus:border-indigo-500"
          />
          <span className="text-xs text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={query.ageMax}
            onChange={(e) => update({ ageMax: e.target.value })}
            className="w-16 border-0 border-b border-gray-300 px-1 py-0.5 text-xs focus:outline-none focus:ring-0 focus:border-indigo-500"
          />
        </div>

        <MultiSelectDropdown
          label="Category"
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
          label="Payment"
          values={query.paymentMethods}
          options={FILTER_OPTIONS.paymentMethods}
          onChange={(v) => update({ paymentMethods: v })}
        />

        <div className="flex items-center gap-1 border border-gray-300 rounded-md px-2 py-1.5 bg-white">
          <span className="text-xs text-gray-500 whitespace-nowrap">Date:</span>
          <input
            type="date"
            value={query.startDate}
            onChange={(e) => update({ startDate: e.target.value })}
            className="border-0 border-b border-gray-300 px-1 py-0.5 text-xs focus:outline-none focus:ring-0 focus:border-indigo-500"
          />
          <span className="text-xs text-gray-400">-</span>
          <input
            type="date"
            value={query.endDate}
            onChange={(e) => update({ endDate: e.target.value })}
            className="border-0 border-b border-gray-300 px-1 py-0.5 text-xs focus:outline-none focus:ring-0 focus:border-indigo-500"
          />
        </div>

        <select
          value={query.sortBy}
          onChange={(e) => update({ sortBy: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="date">Date (Newest First)</option>
          <option value="quantity">Quantity</option>
          <option value="customerName">Customer Name (A–Z)</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="px-3 py-1.5 text-xs bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 whitespace-nowrap"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
