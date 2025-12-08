import { useState } from "react";

export default function useSalesQueryState() {
  const [state, setState] = useState({
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
    sortBy: "customerName",
    sortOrder: "asc",
    page: 1,
  });

  const update = (patch) => {
    setState((prev) => {
      // if only page is changing, don't reset page to 1
      if (
        Object.keys(patch).length === 1 &&
        Object.prototype.hasOwnProperty.call(patch, "page")
      ) {
        return { ...prev, ...patch };
      }
      return { ...prev, ...patch, page: 1 };
    });
  };

  return { state, update };
}
