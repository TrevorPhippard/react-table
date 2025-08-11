import { useEffect, useRef } from "react";

type focusedCell = {
  row: number;
  col: number;
};

interface CellProps {
  value: string | number;
  col: string;
  rowIndex: number;
  colIndex: number;
  totalRows: number;
  totalCols: number;
  focusedCell: focusedCell | null;
  registerRef: (node: HTMLDivElement | null) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function Cell({
  col,
  value,
  rowIndex,
  colIndex,
  registerRef,
  onKeyDown,
  focusedCell,
}: Readonly<CellProps>) {
  const ref = useRef<HTMLTableDataCellElement | null>(null);

  useEffect(() => {
    registerRef(ref.current);
    return () => registerRef(null);
  }, [registerRef]);

  const check =
    focusedCell !== null &&
    focusedCell.row === rowIndex &&
    focusedCell.col === colIndex;

  return (
    <td
      tabIndex={check ? 1 : 0}
      id={"focus_" + colIndex + "_" + rowIndex}
      ref={ref}
      className="p-2 before:font-bold before:capitalize before:pr-2 truncate "
      data-cell={col}
      role="gridcell"
      aria-colindex={colIndex + 1}
      aria-rowindex={rowIndex + 1}
      onKeyDown={onKeyDown}
      style={{
        outline: check ? "2px solid Highlight" : "none",
        // userSelect: "none",
      }}
    >
      <span className="inline-block sm:hidden font-bold mr-2">{col}: </span>
      {value}
    </td>
  );
}
