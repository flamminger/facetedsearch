import { IData } from "../../types/interfaces";
import { Grid } from "@mui/material";
import LoadingSpinner from "../ui/LoadingSpinner";
import ItemTable from "../table/ItemTable";
import React from "react";

interface Props {
  filteredData: IData[] | undefined;
}

const TableBlock: React.FC<Props> = ({ filteredData }) => {
  return (
    <Grid item xs={12} md={8}>
      {!filteredData && <LoadingSpinner />}
      {filteredData && <ItemTable data={filteredData} />}
    </Grid>
  );
};

export default TableBlock;
