import MaterialReactTable from "material-react-table";
import type { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { Data } from "../../types/interfaces";

interface Props {
  data: Data[];
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

const ItemTable: React.FC<Props> = ({ data }) => {
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
      enableRowSelection={false}
      enableColumnOrdering={true}
      enableGlobalFilter={true}
    />
  );
};

export default ItemTable;
