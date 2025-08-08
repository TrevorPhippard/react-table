import { useMemo } from "react";
import type { RowData } from "../types";

export function useSortedData(
  data: RowData[],
  sortColumn: string | null,
  sortDirection: "asc" | "desc" | null
): RowData[] {
  return useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      if (aVal === bVal) return 0;
      return (aVal > bVal ? 1 : -1) * (sortDirection === "asc" ? 1 : -1);
    });
  }, [data, sortColumn, sortDirection]);
}
