import type { Column, RowData } from "../types";
import { getDaysGoneBy } from "../utils/daysSince";

export function useColumns(): Column[] {
  return [
    { id: "ID", title: "ID", accessor: (row: RowData) => row.ID },
    {
      id: "full_name",
      title: "Full Name",
      accessor: (row: RowData) => row.first_name + " " + row.last_name,
    },
    {
      id: "first_name",
      title: "First Name",
      accessor: (row: RowData) => row.first_name,
    },
    {
      id: "last_name",
      title: "Last Name",
      accessor: (row: RowData) => row.last_name,
    },
    { id: "email", title: "Email", accessor: (row: RowData) => row.email },
    { id: "city", title: "City", accessor: (row: RowData) => row.city },
    {
      id: "registered_date",
      title: "Registered Date",
      accessor: (row: RowData) => row.registered_date, // ← fix: use registered_date here
    },
    {
      id: "DSR",
      title: "DSR",
      accessor: (row: RowData) => getDaysGoneBy(row.registered_date) + " Days",
    },
  ];
}
