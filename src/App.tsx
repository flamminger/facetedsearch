import React, { useEffect } from "react";
import "./App.css";
import { AppData, UniqueTags } from "./types/interfaces";
import { getFacets, getJson, getTags } from "./helpers/api-util";
import ItemTable from "./components/table/ItemTable";
import Facet from "./components/facet/Facet";
import { Container } from "@mui/material";

function App() {
  const [data, setData] = React.useState<AppData>();
  const [facets, setFacets] = React.useState<UniqueTags>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: AppData = await getJson("api/rta.json");
        if (data) {
          setData(data);
          const facets = getFacets(data);
          setFacets(facets);
        }
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to fetch JSON ${error.message}`);
        } else {
          throw new Error("Something went wrong!");
        }
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {/*<Container>{data && <ItemTable data={data.data.data} />}</Container>*/}
      <Container>
        {Object.keys(facets).length > 0 && data && <Facet facets={facets} data={data} />}
      </Container>
    </>
  );
}

export default App;
