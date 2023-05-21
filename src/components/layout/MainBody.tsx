import { Container, Grid } from "@mui/material";
import FacetBlock from "./FacetBlock";
import TableBlock from "./TableBlock";
import React from "react";
import { IAppData, IData, IUniqueTags } from "../../types/interfaces";

interface Props {
  data: IAppData | undefined;
  filteredData: IData[] | undefined;
  facets: IUniqueTags;
}

const MainBody: React.FC<Props> = ({ data, facets, filteredData }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <FacetBlock data={data} filteredData={filteredData} facets={facets} />
        <TableBlock filteredData={filteredData} />
      </Grid>
    </Container>
  );
};

export default MainBody;
