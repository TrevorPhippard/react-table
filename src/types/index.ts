export type RowData = {
  ID: number;
  first_name: string;
  last_name: string;
  full_name?: string;
  email: string;
  city: string;
  registered_date: string;
  DSR?: string;
  [key: string]: unknown;
};

export type Column = {
  id: string;
  title: string;
  accessor: (row: RowData) => string | number;
  label?: string;
};
export type TableProps = {
  columns: Column[];
  data: RowData[];
};

export type Direction = "ascending" | "descending" | "none";

export type SortState = {
  column: string | null;
  direction: Direction;
};
