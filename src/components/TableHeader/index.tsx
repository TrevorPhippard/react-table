import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type Column } from "../../types";
import { useRef, useState, useEffect } from "react";

interface Props {
  column: Column;
  colIndex: number;
  sortState: {
    column: string | null;
    direction: "ascending" | "descending" | "none";
  };
  onSort: (id: string) => void;
  focused: boolean;
  focusFirstCellInColumn: (colIndex: number | null) => void;
  registerHeaderRef: (index: number, node: HTMLTableCellElement | null) => void;
}

export function TableHeader({
  column,
  colIndex,
  // dataLength,
  sortState,
  onSort,
  focused,
  focusFirstCellInColumn,
  registerHeaderRef,
}: Readonly<Props>) {
  const { listeners, transform, transition, isDragging, setNodeRef } =
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
    outline: focused ? "2px solid Highlight" : "none",
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusFirstCellInColumn(colIndex);
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
        setNodeRef(node);
        registerHeaderRef(colIndex, node);
        ref.current = node;
      }}
      onKeyDown={handleKeyDown}
    >
      <div
        tabIndex={0}
        className="flex items-center justify-between px-4 cursor-pointer select-none"
        onClick={() => onSort(column.id)}
      >
        <div className="truncate p-3">{column.title}</div>
        <div className="flex">
          {sortState.column === column.id && (
            <span className="text-xs">
              {sortState.direction === "ascending" ? "▲" : "▼"}
            </span>
          )}
          <div className="cursor-grab pl-2" {...listeners}>
            ⠿
          </div>
        </div>
      </div>
    </th>
  );
}
