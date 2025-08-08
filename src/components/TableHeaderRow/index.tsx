import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TableHeader } from "../TableHeader";
import type { SortState, Column } from "../../types";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";

interface TableHeaderRowProps {
  orderedColumns: Column[];
  sortState: SortState;
  onSort: (columnId: string) => void;
  columnOrder: string[];
  handleDragEnd: (event: DragEndEvent) => void;
  focusFirstCellInColumn: (colIndex: string) => void;
}

export function TableHeaderRow({
  orderedColumns,
  sortState,
  onSort,
  columnOrder,
  handleDragEnd,
  focusFirstCellInColumn,
}: Readonly<TableHeaderRowProps>) {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={columnOrder}
        strategy={horizontalListSortingStrategy}
      >
        {orderedColumns.map((col) => (
          <TableHeader
            key={col.id}
            column={col}
            sortState={sortState}
            onSort={onSort}
            focusFirstCellInColumn={focusFirstCellInColumn} // pass handler
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
