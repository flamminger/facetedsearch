import React, { useEffect } from "react";
import "./App.css";
import { JsonData, TagSet } from "./types/interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import { getFacets, getJson, getTags } from "./helpers/api-util";
import ItemTable from "./components/table/ItemTable";
import Facet from "./components/facet/Facet";
import { Container } from "@mui/material";

function App() {
  const [data, setData] = React.useState<JsonData>();
  const [facets, setFacets] = React.useState<TagSet>({});

  useEffect(() => {
    const fetchData = async () => {
      const data: JsonData = await getJson("api/rta.json");
      if (data) {
        setData(data);
        const facets = getFacets(data);
        setFacets(facets);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {/*<Container>{data && <ItemTable data={data.data.data} />}</Container>*/}
      <Container>
        {facets && data && <Facet facets={facets} data={data} />}
      </Container>
    </>
  );
}

export default App;
