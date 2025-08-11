import { useRef } from "react";

// Hook for managing focus within the table
export function useFocusManagement() {
  const headerRefs = useRef<(HTMLTableCellElement | null)[]>([]);
  const cellRefs = useRef<(HTMLTableDataCellElement | null)[]>([]);

  const focusCell = (rowIndex: number, colIndex: number) => {
    const cell = cellRefs.current[rowIndex * colIndex];
    if (cell) {
      cell.focus();
    }
  };

  const focusHeader = (colIndex: number) => {
    const header = headerRefs.current[colIndex];
    if (header) {
      header.focus();
    }
  };

  const registerHeaderRef = (
    colIndex: number,
    node: HTMLTableCellElement | null
  ) => {
    headerRefs.current[colIndex] = node;
  };

  const registerCellRef = (
    rowIndex: number,
    colIndex: number,
    node: HTMLTableDataCellElement | null
  ) => {
    const index = rowIndex * colIndex;
    cellRefs.current[index] = node;
  };

  return {
    focusCell,
    focusHeader,
    registerHeaderRef,
    registerCellRef,
  };
}
