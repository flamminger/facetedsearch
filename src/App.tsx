import React, { useEffect, useMemo } from "react";
import "./App.css";
import { IAppData, IUniqueTags } from "./types/interfaces";
import { getJson } from "./helpers/api-util";
import { getFacets } from "./helpers/data-util";
import ItemTable from "./components/table/ItemTable";
import Facet from "./components/facet/Facet";
import { Container, createTheme, Grid, ThemeProvider } from "@mui/material";
import { useSelectedTags } from "./contexts/SelectedTagsContext";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import AppTitle from "./components/ui/AppTitle";
import ActiveTags from "./components/ui/ActiveTags";

const theme = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
});

function App() {
  const [data, setData] = React.useState<IAppData>();
  const [facets, setFacets] = React.useState<IUniqueTags>({});
  const { selectedTags } = useSelectedTags();

  const title = useMemo((): string => {
    if (data && data.gui && data.gui.appTitle) {
      return data.gui.appTitle;
    }
    return "App Title";
  }, [data]);

  const filteredData = useMemo(() => {
    if (!data?.data?.data || selectedTags.length === 0) {
      return data?.data.data;
    }

    return data.data.data.filter((item) => {
      return selectedTags.every((tag) => item.tags.includes(tag));
    });
  }, [data, selectedTags]);

  /**
   * Fetch data from API
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IAppData = await getJson("/api/rta.json");
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
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <AppTitle title={title} />
          </Grid>
          <Grid item xs={8}>
            <ActiveTags />
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {!data && <LoadingSpinner />}
            {Object.keys(facets).length > 0 && data && (
              <Facet
                facets={facets}
                AppData={data}
                filteredData={filteredData}
              />
            )}
          </Grid>
          <Grid item xs={8}>
            {!filteredData && <LoadingSpinner />}
            {filteredData && <ItemTable data={filteredData} />}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
