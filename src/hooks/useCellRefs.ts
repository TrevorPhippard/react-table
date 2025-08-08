import { useRef } from "react";

export function useCellRefs() {
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Register or unregister a cell node by row-col key
  function registerCellRef(
    row: number,
    col: number,
    node: HTMLDivElement | null
  ) {
    const key = `${row}-${col}`;
    if (node) {
      cellRefs.current.set(key, node);
    } else {
      cellRefs.current.delete(key);
    }
  }

  // Focus a specific cell if exists
  function focusCell(row: number, col: number) {
    const key = `${row}-${col}`;
    const node = cellRefs.current.get(key);
    if (node) {
      node.focus();
      return true;
    }
    return false;
  }

  return { registerCellRef, focusCell };
}
