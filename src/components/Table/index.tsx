import { useState, useMemo } from "react";
import { type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type { TableProps, Direction, SortState } from "../../types";
import { useSortedData } from "../../hooks/useSortedData";
import { TableVirtuoso } from "react-virtuoso";
import { Cell } from "../Cell";
import { TableHeaderRow } from "../TableHeaderRow";

export function Table({ columns, data }: Readonly<TableProps>) {
  // Keep track of column order for drag-and-drop
  const [columnOrder, setColumnOrder] = useState(() =>
    columns.map((col) => col.id)
  );
  // Track current sort state
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  // Sort the data based on the current sort state
  const sortedData = useSortedData(data, sortState.column, sortState.direction);

  // Get the ordered list of columns based on columnOrder
  const orderedColumns = useMemo(() => {
    return columnOrder
      .map((id) => columns.find((col) => col.id === id)!)
      .filter(Boolean);
  }, [columnOrder, columns]);

  // Toggle sort direction or set new sort column
  const handleSort = (columnId: string) => {
    setSortState((prev: SortState) => ({
      column: columnId,
      direction: getDirection(prev, columnId),
    }));
  };

  function getDirection(prev: SortState, columnId: string): Direction {
    if (prev.column === columnId) {
      return prev.direction === "asc" ? "desc" : "asc";
    }
    return "asc";
  }

  // Handle drag-and-drop column reordering
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over?.id) {
      setColumnOrder((prevOrder) =>
        arrayMove(
          prevOrder,
          prevOrder.indexOf(String(active.id)),
          prevOrder.indexOf(String(over.id))
        )
      );
    }
  };

  return (
    <div className="mx-auto max-w-full overflow-x-auto [width:min(900px,100%-3rem)]  h-200 block">
      <TableVirtuoso
        style={{ height: "100%" }}
        data={sortedData}
        fixedHeaderContent={() => (
          <TableHeaderRow
            orderedColumns={orderedColumns}
            sortState={sortState}
            onSort={handleSort}
            columnOrder={columnOrder}
            handleDragEnd={handleDragEnd}
          />
        )}
        itemContent={(_index, row) =>
          orderedColumns.map((col) => (
            <Cell key={col.id} value={col.accessor(row)} col={col.id} />
          ))
        }
      />
    </div>
  );
}
