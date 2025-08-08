import { useMemo } from "react";
import { getDaysGoneBy } from "../utils/daysSince";
import { type RowData } from "../types";

export function useWithNewFeilds(data: RowData[]) {
  return useMemo(() => {
    return data.map((row) => ({
      ...row,
      full_name: `${row.first_name} ${row.last_name}`.trim(),
      DSR: getDaysGoneBy(row.registered_date) + " Days",
    }));
  }, [data]);
}

//  {
//       id: "full_name",
//       title: "Full Name",
//       accessor: (row: RowData) => row.first_name + " " + row.last_name,
//     },
//     {
//       id: "DSR",
//       title: "DSR",
//       accessor: (row: RowData) => getDaysGoneBy(row.registered_date) + " Days",
//     },
