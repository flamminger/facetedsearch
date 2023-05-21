import type { MRT_ColumnDef } from "material-react-table";
import MaterialReactTable from "material-react-table";
import React, { useMemo } from "react";
import { IData } from "../../types/interfaces";
import { useSelectedTags } from "../../contexts/SelectedTagsContext";
import DetailPanel from "./DetailPanel";

interface Props {
  data: IData[];
}

const ItemTable: React.FC<Props> = ({ data }) => {
  const { selectedTags, isTagSelected, addTag, removeTag } = useSelectedTags();
  const filteredData = useMemo(() => {
    if (selectedTags.size === 0) {
      return data;
    }

    return data.filter((item) => {
      const currentTags = Array.from(selectedTags);
      return currentTags.every((tag) => item.tags.includes(tag));
    });
  }, [data, selectedTags]);

  const columns = useMemo<MRT_ColumnDef<IData>[]>(
    () => [
      {
        header: "Title",
        accessorKey: "txt",
      },
      {
        header: "DateRange: Start",
        accessorFn: (row) => {
          if (!row.date) {
            return "NA";
          } else if (row.date && row.date.startDate) {
            return row.date.startDate;
          }
        },
      },
      {
        header: "DateRange: End",
        accessorFn: (row) => {
          if (!row.date) {
            return "NA";
          } else if (row.date && row.date.endDate) {
            return row.date.endDate;
          }
        },
      },
    ],
    []
  );

  const tagSelectHandler = (tag: string) => {
    if (isTagSelected(tag)) {
      removeTag(tag);
    } else {
      addTag(tag);
    }
  };

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
      enableFullScreenToggle={false}
      enableDensityToggle={false}
      memoMode={"cells"}
      muiTableContainerProps={{ sx: { maxHeight: "50vh" } }}
      enableStickyHeader={true}
      renderDetailPanel={({ row }) => (
        <DetailPanel
          row={row}
          selectedTags={selectedTags}
          tagSelectHandler={tagSelectHandler}
        />
      )}
    />
  );
};

export default ItemTable;
