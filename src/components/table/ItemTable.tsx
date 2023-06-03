import type { MRT_ColumnDef } from "material-react-table";
import MaterialReactTable from "material-react-table";
import React, { useMemo } from "react";
import { IData } from "../../types/interfaces";
import { useSelectedTags } from "../../contexts/SelectedTagsContext";
import DetailPanel from "./DetailPanel";

interface Props {
  data: IData[];
}

/**
 * The ItemTable component renders a table of items with Material-UI based table.
 *
 * Props:
 * - data: An array of IData objects to be displayed in the table.
 *
 * This component uses the context from SelectedTagsContext for selected tags,
 * functions to add and remove tags, and to check if a tag is selected.
 *
 * With the useMemo hook, filteredData is computed as the items that include every tag in selectedTags.
 * If no tags are selected, all items are returned.
 *
 * It defines columns for the MaterialReactTable, with a single column for the title of the item.
 *
 * It also provides a tagSelectHandler function that either adds or removes a tag from the selection
 * based on whether it is currently selected.
 *
 * The MaterialReactTable component from the 'material-react-table' library is used to create the table.
 * The table includes a global filter and sticky headers, but does not include other options
 * such as row selection, column ordering, full-screen toggle, density toggle, column dragging, or hiding.
 * The detail panel for each row is rendered with the DetailPanel component,
 * passing the row data, the selected tags, and the tagSelectHandler function as props.
 */
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
        size: 500,
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

  return (
    <MaterialReactTable
      columns={columns}
      data={filteredData}
      enableRowSelection={false}
      enableColumnOrdering={false}
      enableGlobalFilter={true}
      enableFullScreenToggle={false}
      enableDensityToggle={false}
      enableColumnDragging={false}
      enableHiding={false}
      memoMode={"cells"}
      muiTableContainerProps={{ sx: { maxHeight: "60vh" } }}
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
