import React from "react";

type Props = {
  title: string;
  isSorted: boolean;
  sortDirection: "asc" | "desc" | null;
  onSort: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
};

export function ColumnHeader({
  title,
  isSorted,
  sortDirection,
  onSort,
  dragHandleProps,
}: Readonly<Props>) {
  return (
    <div
      tabIndex={0}
      className="flex items-center justify-between px-4 cursor-pointer select-none"
      onClick={onSort}
    >
      <div className="truncate p-3">{title}</div>
      <div className="flex">
        {isSorted && (
          <span className="text-xs">{sortDirection === "asc" ? "▲" : "▼"}</span>
        )}
        <div className="cursor-grab pl-2" {...dragHandleProps}>
          ⠿
        </div>
      </div>
    </div>
  );
}
