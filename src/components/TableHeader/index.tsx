import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type Column } from "../../types";
import { ColumnHeader } from "../ColumnHeader";
import { useRef, useState, useEffect } from "react";

interface Props {
  column: Column;
  colIndex: number;
  sortState: {
    column: string | null;
    direction: "ascending" | "descending" | "none";
  };
  onSort: (id: string) => void;
  focusFirstCellInColumn: (colIndex: string) => void;
  registerHeaderRef: (index: number, node: HTMLTableCellElement | null) => void;
}

export function TableHeader({
  column,
  colIndex,
  sortState,
  onSort,
  focusFirstCellInColumn,
  registerHeaderRef,
}: Readonly<Props>) {
  const { attributes, listeners, transform, transition, isDragging } =
    useSortable({ id: column.id });

  const ref = useRef<HTMLTableCellElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const measuredWidth = ref.current.getBoundingClientRect().width;
      setWidth(measuredWidth);
    }
  }, [column.id]);

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    width: isDragging ? width : "auto", // fix width when dragging
    minWidth: width, // ensure minWidth matches width to prevent shrinking
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusFirstCellInColumn(column.id);
    }
  };

  return (
    <th
      key={column.id}
      scope="col"
      role="columnheader"
      className="bg-thrive-purple text-white text-left max-[650px]:hidden"
      style={style}
      aria-sort={sortState.direction}
      ref={(node) => {
        registerHeaderRef(colIndex, node);
        ref.current = node;
      }}
      onKeyDown={handleKeyDown}
    >
      <ColumnHeader
        title={column.title}
        isSorted={sortState.column === column.id}
        sortDirection={sortState.direction}
        onSort={() => onSort(column.id)}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </th>
  );
}
