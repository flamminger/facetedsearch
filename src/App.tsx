import React, { useEffect, useMemo } from "react";
import "./App.css";
import { AppData, UniqueTags } from "./types/interfaces";
import { getJson } from "./helpers/api-util";
import { getFacets } from "./helpers/data-util";
import ItemTable from "./components/table/ItemTable";
import Facet from "./components/facet/Facet";
import { Grid } from "@mui/material";
import { useSelectedTags } from "./contexts/SelectedTagsContext";

function App() {
  const [data, setData] = React.useState<AppData>();
  const [facets, setFacets] = React.useState<UniqueTags>({});

  const { selectedTags } = useSelectedTags();

  const filteredData = useMemo(() => {
    if (!data?.data?.data || selectedTags.length === 0) {
      return data?.data.data;
    }

    return data.data.data.filter((item) => {
      return selectedTags.every((tag) => item.tags.includes(tag));
    });
  }, [data, selectedTags]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: AppData = await getJson("/api/rta.json");
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
    <Grid container spacing={2}>
      <Grid item xs={4}>
        {Object.keys(facets).length > 0 && data && (
          <Facet facets={facets} AppData={data} filteredData={filteredData} />
        )}
      </Grid>
      <Grid item xs={8}>
        {filteredData && <ItemTable data={filteredData} />}
      </Grid>
    </Grid>
  );
}

export default App;
