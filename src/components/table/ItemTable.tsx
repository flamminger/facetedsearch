import type { MRT_ColumnDef } from "material-react-table";
import MaterialReactTable from "material-react-table";
import React, { useMemo } from "react";
import { IData } from "../../types/interfaces";
import { useSelectedTags } from "../../contexts/SelectedTagsContext";
import { Chip, Container, Grid, Link } from "@mui/material";

interface Props {
  data: IData[];
}

const ItemTable: React.FC<Props> = ({ data }) => {
  const { selectedTags, setSelectedTags } = useSelectedTags();
  const filteredData = useMemo(() => {
    if (selectedTags.length === 0) {
      return data;
    }

    return data.filter((item) => {
      return selectedTags.every((tag) => item.tags.includes(tag));
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
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prevTags) => {
        return prevTags.concat(tag);
      });
    } else {
      setSelectedTags((prevTags) => {
        return prevTags.filter((prevTag) => prevTag !== tag);
      });
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
        <Container>
          <p>
            <strong>Title: </strong>
            <Link href={`https://gams.uni-graz.at/${row.original.value}`}>
              {row.original.txt}
            </Link>
          </p>
          <Grid container spacing={0.5} wrap="wrap">
            {row.original.tags.map((tag, index) => (
              <Grid key={index} item xs="auto">
                <Chip
                  label={tag}
                  size="small"
                  sx={{ fontSize: "0.75rem" }}
                  variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                  onClick={() => tagSelectHandler(tag)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    />
  );
};

export default ItemTable;
