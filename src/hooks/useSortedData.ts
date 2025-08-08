import { useMemo } from "react";
import type { RowData, Direction } from "../types";

export function useSortedData(
  data: RowData[],
  sortColumn: string | null,
  sortDirection: Direction
): RowData[] {
  return useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (aVal === bVal) return 0;
      if (aVal == null) return sortDirection === "ascending" ? -1 : 1;
      if (bVal == null) return sortDirection === "ascending" ? 1 : -1;

      return (aVal > bVal ? 1 : -1) * (sortDirection === "ascending" ? 1 : -1);
    });
  }, [data, sortColumn, sortDirection]);
}
