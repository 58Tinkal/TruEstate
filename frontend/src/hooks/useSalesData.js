import { useEffect, useState } from "react";
import api from "../api";

function toParam(v) {
  if (Array.isArray(v)) return v.length ? v.join(",") : undefined;
  return v || undefined;
}

export default function useSalesData(queryState) {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = {
      search: toParam(queryState.search),
      regions: toParam(queryState.regions),
      genders: toParam(queryState.genders),
      ageMin: toParam(queryState.ageMin),
      ageMax: toParam(queryState.ageMax),
      categories: toParam(queryState.categories),
      tags: toParam(queryState.tags),
      paymentMethods: toParam(queryState.paymentMethods),
      startDate: toParam(queryState.startDate),
      endDate: toParam(queryState.endDate),
      sortBy: queryState.sortBy,
      sortOrder: queryState.sortOrder,
      page: queryState.page,
    };

    setLoading(true);
    setError("");

    api
      .get("/sales", { params })
      .then((res) => {
        setData(res.data.data || []);
        setSummary(res.data.summary || null);
        setMeta(res.data.meta || null);
      })
      .catch(() => {
        setError("Failed to load data");
        setData([]);
        setSummary(null);
        setMeta(null);
      })
      .finally(() => setLoading(false));
  }, [JSON.stringify(queryState)]);

  return { data, summary, meta, loading, error };
}
