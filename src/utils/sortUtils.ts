import type { SortState, Direction } from "../types";

export function getNextSortDirection(
  prev: SortState,
  columnId: string
): Direction {
  if (prev.column === columnId) {
    return prev.direction === "ascending" ? "descending" : "ascending";
  }
  return "ascending";
}
