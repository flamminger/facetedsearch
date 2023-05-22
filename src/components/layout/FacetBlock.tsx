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
