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
  focusedHeader: number | null;
  columnOrder: string[];
  handleDragEnd: (event: DragEndEvent) => void;
  focusFirstCellInColumn: (colIndex: number | null) => void;
  registerHeaderRef: (index: number, node: HTMLTableCellElement | null) => void;
}

export function TableHeaderRow({
  orderedColumns,
  sortState,
  onSort,
  focusedHeader,
  columnOrder,
  handleDragEnd,
  focusFirstCellInColumn,
  registerHeaderRef,
}: Readonly<TableHeaderRowProps>) {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={columnOrder}
        strategy={horizontalListSortingStrategy}
      >
        {orderedColumns.map((col, index) => (
          <TableHeader
            key={col.id}
            column={col}
            colIndex={index}
            sortState={sortState}
            onSort={onSort}
            registerHeaderRef={registerHeaderRef}
            focusFirstCellInColumn={focusFirstCellInColumn}
            focused={focusedHeader === index}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
