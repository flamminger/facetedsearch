import type { MRT_ColumnDef } from "material-react-table";
import MaterialReactTable from "material-react-table";
import React, { useMemo } from "react";
import { Data } from "../../types/interfaces";
import { useSelectedTags } from "../../contexts/SelectedTagsContext";

interface Props {
  data: Data[];
}

const ItemTable: React.FC<Props> = ({ data }) => {
  const { selectedTags } = useSelectedTags();

  const filteredData = useMemo(() => {
    if (selectedTags.length === 0) {
      return data;
    }

    return data.filter((item) => {
      return selectedTags.every((tag) => item.tags.includes(tag));
    });
  }, [data, selectedTags]);

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

  if (!filteredData || filteredData.length === 0) {
    return <div>No data available to display</div>;
  }

  return (
    <MaterialReactTable
      columns={columns}
      data={filteredData}
      enableRowSelection={false}
      enableColumnOrdering={true}
      enableGlobalFilter={true}
    />
  );
};

export default ItemTable;
