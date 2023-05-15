import React, { useEffect } from "react";
import "./App.css";
import { AppData, UniqueTags } from "./types/interfaces";
import { getFacets, getJson } from "./helpers/api-util";
import ItemTable from "./components/table/ItemTable";
import Facet from "./components/facet/Facet";
import { Grid } from "@mui/material";
import { SelectedTagsProvider } from "./contexts/SelectedTagsContext";

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
    <SelectedTagsProvider>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {Object.keys(facets).length > 0 && data && (
            <Facet facets={facets} AppData={data} />
          )}
        </Grid>
        <Grid item xs={8}>
          {data && <ItemTable data={data.data.data} />}
        </Grid>
      </Grid>
    </SelectedTagsProvider>
  );
}

export default App;
