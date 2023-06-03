import { IData } from "../../types/interfaces";
import { Grid } from "@mui/material";
import LoadingSpinner from "../ui/LoadingSpinner";
import ItemTable from "../table/ItemTable";
import React from "react";

interface Props {
  filteredData: IData[] | undefined;
}

/**
 * The TableBlock component renders a table of data from the filtered dataset.
 * It also shows a loading spinner when the data is not available.
 *
 * Props:
 * - filteredData: A subset of the main dataset after applying filters.
 *
 * This component uses the Grid item from Material-UI for its responsive design.
 * It occupies 8 out of 12 grid units on medium to large screens (md breakpoint and up)
 * and defaults to 12 units on smaller screens.
 *
 * When filteredData is not available, a LoadingSpinner component is displayed.
 * When filteredData is available, it is passed as a prop to the ItemTable component to be displayed.
 */
const TableBlock: React.FC<Props> = ({ filteredData }) => {
  return (
    <Grid item xs={12} md={8}>
      {!filteredData && <LoadingSpinner />}
      {filteredData && <ItemTable data={filteredData} />}
    </Grid>
  );
};

export default TableBlock;
