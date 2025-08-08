import { useState, useMemo } from "react";
import { type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type { TableProps, SortState } from "../../types";
import { useSortedData } from "../../hooks/useSortedData";

import { useWithNewFeilds } from "../../hooks/useWithNewFeilds";
import { TableVirtuoso } from "react-virtuoso";
import { TableHeaderRow } from "../TableHeaderRow";
import { Cell } from "../Cell";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation"; // new file
import { getNextSortDirection } from "../../utils/sortUtils"; // new file

import { useHeaderRefs } from "../../hooks/useHeaderRefs";
import { useCellRefs } from "../../hooks/useCellRefs"; // new file

export function Table({ columns, data: tableData }: Readonly<TableProps>) {
  const [columnOrder, setColumnOrder] = useState(() =>
    columns.map((c) => c.id)
  );

  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: "none",
  });

  //  refs hook for focus management
  const { registerCellRef, focusCell } = useCellRefs();
  const { registerHeaderRef, focusHeader } = useHeaderRefs();

  const data = useWithNewFeilds(tableData);

  // Sorted data based on sortState
  const sortedData = useSortedData(data, sortState.column, sortState.direction);

  // Columns ordered by drag-and-drop
  const orderedColumns = useMemo(() => {
    return columnOrder
      .map((id) => columns.find((col) => col.id === id)!)
      .filter(Boolean);
  }, [columnOrder, columns]);

  // Keyboard navigation hook
  const { focusedCell, focusedHeader, onCellKeyDown, focusFirstCellInColumn } =
    useKeyboardNavigation(
      sortedData.length,
      orderedColumns.length,
      focusCell,
      focusHeader
    );

  // Toggle sort direction
  const handleSort = (columnId: string) => {
    setSortState((prev) => ({
      column: columnId,
      direction: getNextSortDirection(prev, columnId),
    }));
  };

  // Handle drag end to reorder columns
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setColumnOrder((prev) =>
        arrayMove(
          prev,
          prev.indexOf(String(active.id)),
          prev.indexOf(String(over.id))
        )
      );
    }
  };

  return (
    <div className="mx-auto max-w-full overflow-x-auto [width:min(1385px,100%-3rem)] h-200 ">
      <TableVirtuoso
        style={{ height: "100%" }}
        data={sortedData}
        fixedHeaderContent={() => (
          <TableHeaderRow
            orderedColumns={orderedColumns}
            sortState={sortState}
            focusedHeader={focusedHeader}
            onSort={handleSort}
            columnOrder={columnOrder}
            handleDragEnd={handleDragEnd}
            focusFirstCellInColumn={focusFirstCellInColumn}
            registerHeaderRef={registerHeaderRef}
          />
        )}
        itemContent={(rowIndex, row) =>
          orderedColumns.map((col, colIndex) => (
            <Cell
              key={col.id}
              value={col.accessor(row)}
              col={col.id}
              rowIndex={rowIndex}
              colIndex={colIndex}
              totalRows={sortedData.length}
              totalCols={orderedColumns.length}
              focused={
                focusedCell !== null &&
                focusedCell.row === rowIndex &&
                focusedCell.col === colIndex
              }
              tabIndex={
                focusedCell !== null &&
                focusedCell.row === rowIndex &&
                focusedCell.col === colIndex
                  ? 0
                  : -1
              }
              registerRef={(node) => registerCellRef(rowIndex, colIndex, node)}
              onKeyDown={(e) => onCellKeyDown(e, rowIndex, colIndex)}
            />
          ))
        }
      />
    </div>
  );
}
