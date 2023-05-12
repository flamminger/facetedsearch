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
  const [tags, setTags] = React.useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const data: JsonData = await getJson("api/rta.json");
      if (data) {
        setData(data);
        const facets = getFacets(data);
        setFacets(facets);
        const tags = getTags(data);
        setTags(tags);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {/*<Container>{data && <ItemTable data={data.data.data} />}</Container>*/}
      <Container>
        {facets && data && <Facet facets={facets} data={data} tags={tags} />}
      </Container>
    </>
  );
}

export default App;
