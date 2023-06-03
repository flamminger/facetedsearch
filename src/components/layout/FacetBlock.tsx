import { IAppData, IData, IUniqueTags } from "../../types/interfaces";
import { Grid } from "@mui/material";
import LoadingSpinner from "../ui/LoadingSpinner";
import FacetGeneration from "../facet/FacetGeneration";
import React from "react";

interface Props {
  data: IAppData | undefined;
  filteredData: IData[] | undefined;
  facets: IUniqueTags;
  dateRange: [number, number];
  setDateRange: React.Dispatch<React.SetStateAction<[number, number]>>;
  minMaxDate: [number, number];
}

/**
 * The FacetBlock component serves as a container for the FacetGeneration component and also includes
 * a loading spinner for the initial state when data is not yet loaded.
 *
 * Props:
 * - data: The application's data of type IAppData, which could be undefined.
 * - filteredData: An array of IData objects, which is the filtered subset of data to be visualized.
 * - facets: An IUniqueTags object containing the unique tags to generate facets.
 * - dateRange: A tuple of two numbers representing the currently selected date range.
 * - setDateRange: A state dispatch function to set the dateRange.
 * - minMaxDate: A tuple of two numbers representing the minimum and maximum dates available for selection.
 *
 * This component checks if the 'data' prop is undefined. If it is, it shows the LoadingSpinner component.
 * If 'data' is defined and 'facets' has more than 0 keys, it displays the FacetGeneration component, passing
 * all necessary props to it.
 *
 * This component is wrapped in a Grid item, making it responsive to the screen's width. It takes up the full
 * width on screens smaller than medium size (xs to sm in Material-UI's breakpoints) and one third of the
 * width (4 out of 12 columns) on medium and larger screens (md and up).
 */
const FacetBlock: React.FC<Props> = ({
  data,
  filteredData,
  facets,
  dateRange,
  setDateRange,
  minMaxDate,
}) => {
  return (
    <Grid item xs={12} md={4}>
      {!data && <LoadingSpinner />}
      {Object.keys(facets).length > 0 && data && (
        <FacetGeneration
          facets={facets}
          AppData={data}
          filteredData={filteredData}
          dateRange={dateRange}
          setDateRange={setDateRange}
          minMaxDate={minMaxDate}
        />
      )}
    </Grid>
  );
};

export default FacetBlock;
