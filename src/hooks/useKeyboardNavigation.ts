import { useState, useEffect } from "react";
import type { KeyboardEvent } from "react";

function nanToZero(value: number): number {
  return Number.isNaN(value) ? 0 : value;
}

export function useKeyboardNavigation(
  totalRows: number,
  totalCols: number,
  focusCell: (row: number, col: number) => boolean
) {
  const [focusedCell, setFocusedCell] = useState({ row: 0, col: 0 });

  // Whenever focusedCell changes, move focus to that cell
  useEffect(() => {
    console.log("focusedCell::", focusedCell.row, focusedCell.col);

    focusCell(nanToZero(focusedCell.row), nanToZero(focusedCell.col));
  }, [focusedCell, focusCell]);

  // Keyboard handler to update focusedCell state
  function onCellKeyDown(e: KeyboardEvent, row: number, col: number) {
    let newRow = row;
    let newCol = col;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        newRow = Math.min(row + 1, totalRows - 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        newRow = Math.max(row - 1, 0);
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
      setFocusedCell({ row: newRow, col: newCol });
    }
  }

  // helper to focus first cell in a column (for header clicks)
  function focusFirstCellInColumn(colIndex: string) {
    setFocusedCell({ row: 0, col: Number(colIndex) });
  }

  return { focusedCell, onCellKeyDown, focusFirstCellInColumn };
}
