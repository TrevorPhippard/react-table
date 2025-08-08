import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type Column } from "../../types";
import { ColumnHeader } from "../ColumnHeader";

interface Props {
  column: Column;
  sortState: { column: string | null; direction: "asc" | "desc" | null };
  onSort: (id: string) => void;
}

export function TableHeader({ column, sortState, onSort }: Readonly<Props>) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id });

  return (
    <th
      className="bg-thrive-purple text-white text-left  max-[650px]:hidden"
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
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
