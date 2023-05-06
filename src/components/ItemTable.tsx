import MaterialReactTable from "material-react-table";
import type { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Data } from "../types/interfaces";

interface Props {
  data: Data[];
  rowsPerPage: number;
}
interface columns {
  id: number;
  txt: string;
  date: dateRange;
}

interface dateRange {
  startDate: string;
  endDate: string;
}

const testColumns: columns[] = [
  {
    id: 1,
    txt: "test1",
    date: { startDate: "2020-01-01", endDate: "2020-01-02" },
  },
  {
    id: 2,
    txt: "test2",
    date: { startDate: "2020-01-01", endDate: "2020-01-02" },
  },
  {
    id: 3,
    txt: "test3",
    date: { startDate: "2020-01-01", endDate: "2020-01-02" },
  },
];
const ItemTable: React.FC<Props> = ({ data, rowsPerPage }) => {
  const columns = useMemo<MRT_ColumnDef<Data>[]>(
    () => [
      {
        header: "Title",
        accessorKey: "txt",
      },
      {
        header: "From",
        accessorKey: "date.startDate",
      },
      {
        header: "To",
        accessorKey: "date.endDate",
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableRowSelection={true}
      enableColumnOrdering={true}
      enableGlobalFilter={true}
    />
  );
};

export default ItemTable;
