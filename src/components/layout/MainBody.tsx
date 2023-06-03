import { Grid } from "@mui/material";
import FacetBlock from "./FacetBlock";
import TableBlock from "./TableBlock";
import React from "react";
import { IAppData, IData, IUniqueTags } from "../../types/interfaces";

interface Props {
  data: IAppData | undefined;
  filteredData: IData[] | undefined;
  facets: IUniqueTags;
  dateRange: [number, number];
  setDateRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  minMaxDate: [number, number];
}

/**
 * The MainBody component serves as a container for the FacetBlock and TableBlock components.
 * This is where the core interactive functionality of the application is rendered.
 *
 * Props:
 * - data: The main dataset that the app is working with.
 * - filteredData: A subset of the main dataset after applying filters.
 * - facets: The facets data used to filter the main dataset.
 * - dateRange: The current date range applied to the main dataset.
 * - setDateRange: A function to set the date range.
 * - minMaxDate: The minimum and maximum date of the main dataset.
 *
 * This component uses the Grid container from Material-UI to lay out its child components in a responsive manner.
 * It passes down the necessary props to FacetBlock and TableBlock. On smaller screens, these components will stack vertically.
 * On larger screens, they will be positioned side by side.
 */
const MainBody: React.FC<Props> = ({
  data,
  facets,
  filteredData,
  dateRange,
  setDateRange,
  minMaxDate,
}) => {
  return (
    <Grid container spacing={2}>
      <FacetBlock
        data={data}
        filteredData={filteredData}
        facets={facets}
        dateRange={dateRange}
        setDateRange={setDateRange}
        minMaxDate={minMaxDate}
      />
      <TableBlock filteredData={filteredData} />
    </Grid>
  );
};

export default MainBody;
