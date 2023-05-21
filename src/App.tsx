import React, { useEffect, useMemo } from "react";
import "./App.css";
import { IAppData, IUniqueTags } from "./types/interfaces";
import { getJson } from "./helpers/api-util";
import { getFacets } from "./helpers/data-util";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSelectedTags } from "./contexts/SelectedTagsContext";
import Head from "./components/layout/Head";
import MainBody from "./components/layout/MainBody";

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
      <Head title={title} />
      <MainBody data={data} filteredData={filteredData} facets={facets} />
    </ThemeProvider>
  );
}

export default App;
