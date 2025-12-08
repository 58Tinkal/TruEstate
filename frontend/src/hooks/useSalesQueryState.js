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
    sortBy: "date",
    sortOrder: "desc",
    page: 1,
  });

  const update = (patch) => {
    setState((prev) => {
      if (
        Object.keys(patch).length === 1 &&
        Object.prototype.hasOwnProperty.call(patch, "page")
      ) {
        return { ...prev, ...patch };
      }

      let newState = { ...prev, ...patch };

      if (patch.sortBy !== undefined) {
        if (patch.sortBy === "date") {
          newState.sortOrder = "desc";
        } else if (patch.sortBy === "quantity") {
          newState.sortOrder = "desc";
        } else if (patch.sortBy === "customerName") {
          newState.sortOrder = "asc";
        }
      }

      return { ...newState, page: 1 };
    });
  };

  return { state, update };
}
