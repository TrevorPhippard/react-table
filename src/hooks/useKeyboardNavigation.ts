import { useState, useEffect } from "react";
import type { KeyboardEvent } from "react";

function nanToZero(value: number): number {
  return Number.isNaN(value) ? 0 : value;
}

export function useKeyboardNavigation(
  totalRows: number,
  totalCols: number,
  focusCell: (row: number, col: number) => boolean | null,
  focusHeader: (colIndex: number | null) => boolean | null
) {
  // Type focusedCell as nullable object with row and col
  const [focusedCell, setFocusedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [focusedHeader, setFocusedHeader] = useState<number | null>(null);

  useEffect(() => {
    if (focusedCell) {
      focusCell(nanToZero(focusedCell.row), nanToZero(focusedCell.col));
    }
    if (focusedHeader !== null) {
      focusHeader(focusedHeader);
    }
  }, [focusedCell, focusCell, focusHeader, focusedHeader]);

  function onCellKeyDown(e: KeyboardEvent, row: number, col: number) {
    let newRow = row;
    let newCol = col;
    let exitFlag = false;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        newRow = Math.min(row + 1, totalRows - 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (row === 0) {
          newCol = Math.min(col + 1, totalCols - 1);
          exitFlag = true;
          setFocusedCell(null);
          if (focusHeader) focusHeader(newCol);
        } else {
          newRow = Math.max(row - 1, 0);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        newCol = Math.min(col + 1, totalCols - 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        newCol = Math.max(col - 1, 0);
        break;
      case "Home":
        e.preventDefault();
        if (e.ctrlKey || e.metaKey) {
          newRow = 0;
          newCol = 0;
        } else {
          newCol = 0;
        }
        break;
      case "End":
        e.preventDefault();
        if (e.ctrlKey || e.metaKey) {
          newRow = totalRows - 1;
          newCol = totalCols - 1;
        } else {
          newCol = totalCols - 1;
        }
        break;
      default:
        return;
    }

    if (newRow !== row || newCol !== col) {
      if (exitFlag) {
        // Accept 0 as valid index, so check for undefined or null instead
        if (newCol !== null && newCol !== undefined) {
          setFocusedHeader(newCol - 1 >= 0 ? newCol - 1 : 0);
        }
        setFocusedCell(null);
      } else {
        if (focusedCell === null) newRow = --newRow;
        setFocusedCell({ row: newRow, col: newCol });
        setFocusedHeader(null);
      }
    }
  }

  // Accept number instead of string for column index
  function focusFirstCellInColumn(colIndex: number | null) {
    if (colIndex !== null) setFocusedCell({ row: 0, col: colIndex });
  }

  return { focusedCell, focusedHeader, onCellKeyDown, focusFirstCellInColumn };
}
