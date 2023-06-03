import React, { useEffect, useMemo } from "react";
import "./App.css";
import { IAppData, IErrorMessage, IUniqueTags } from "./types/interfaces";
import { getJson } from "./helpers/api-util";
import { getFacets } from "./helpers/data-util";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSelectedTags } from "./contexts/SelectedTagsContext";
import Head from "./components/layout/Head";
import MainBody from "./components/layout/MainBody";
import { useParams } from "react-router-dom";
import Error from "./components/ui/Error";

/**
 * This is the root component of the application, App, which is a functional component.
 *
 * The component fetches data from an API using the useEffect hook, stores the data in a
 * state variable, and provides the data to the child components. It also handles any errors
 * that might occur during the data fetching process.
 *
 * The App component is wrapped with a ThemeProvider component from the Material-UI library
 * to provide theme settings to all child components.
 *
 * Additionally, the App component calculates and stores a min and max date from the fetched data
 * and provides it to the MainBody component. The MainBody component can then manipulate these dates
 * to filter items based on their start and end dates.
 *
 * It also has useMemo to filter data based on selected tags and a given date range.
 *
 * If there's an error while fetching data, the Error component is rendered with the error message.
 * If there's no error, the Head and MainBody components are rendered.
 */

const theme = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
});

function App() {
  const [data, setData] = React.useState<IAppData>();
  const [encounteredError, setEncounteredError] = React.useState<IErrorMessage>(
    { occurred: false, message: "" }
  );
  const [facets, setFacets] = React.useState<IUniqueTags>({});
  const [minMaxDate, setMinMaxDate] = React.useState<[number, number]>([0, 0]);
  const [dateRange, setDateRange] = React.useState<[number, number]>([0, 0]);
  const { selectedTags, addTag } = useSelectedTags();

  const { fileUrl, preSelectedTag } = useParams<{
    fileUrl: string | undefined;
    preSelectedTag: string | undefined;
  }>();

  /**
   * Fetch data from API
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IAppData = await getJson(fileUrl as string);
        if (data) {
          setData(data);
          const facets = getFacets(data);
          setFacets(facets);
        }
      } catch (error) {
        setEncounteredError({
          occurred: true,
          message: `Failed to fetch JSON ${error}`,
        });
        console.error(`Failed to fetch JSON ${error}`);
      }
    };
    if (fileUrl !== undefined) {
      fetchData();
    }
    /**
     * Add pre-selected tag to selected tags context
     */
    if (preSelectedTag?.includes("|")) {
      const tags = preSelectedTag.split("|");
      tags.forEach((tag) => addTag(tag));
    } else if (preSelectedTag && !preSelectedTag.includes("|")) {
      addTag(preSelectedTag);
    }
  }, [addTag, fileUrl, preSelectedTag]);

  /**
   * Set page title
   */
  const title = useMemo((): string => {
    if (data && data.gui && data.gui.appTitle) {
      return data.gui.appTitle;
    }
    return "App Title";
  }, [data]);

  /**
   * Set date range
   */
  useEffect(() => {
    if (data) {
      const dates = data.data.data.flatMap((item) => [
        item.date?.startDate,
        item.date?.endDate,
      ]);
      const validDates = dates
        .map((dateString) => new Date(dateString).getTime())
        .filter((timestamp) => !isNaN(timestamp));

      if (validDates.length > 0) {
        const minDate = Math.min(...validDates);
        const maxDate = Math.max(...validDates);
        setDateRange([minDate, maxDate]);
        setMinMaxDate([minDate, maxDate]);
      }
    }
  }, [data]);

  /**
   * Filter data based on selected tags and date range
   */
  const filteredData = useMemo(() => {
    if (selectedTags.size === 0 && dateRange[0] === 0 && dateRange[1] === 0) {
      return data?.data.data;
    }

    return data?.data.data.filter((item) => {
      const itemStartDate = item.date?.startDate
        ? new Date(item.date?.startDate).getTime()
        : Infinity;
      const itemEndDate = item.date?.endDate
        ? new Date(item.date?.endDate).getTime()
        : -Infinity;

      const isWithinDateRange =
        itemStartDate >= dateRange[0] && itemEndDate <= dateRange[1];

      // Skip items without a start date or end date if the dateRange has been adjusted
      const hasValidDates =
        itemStartDate !== Infinity && itemEndDate !== -Infinity;
      const shouldConsiderDates =
        dateRange[0] !== minMaxDate[0] || dateRange[1] !== minMaxDate[1];

      const currentTags = Array.from(selectedTags);
      const hasAllSelectedTags = currentTags.every((tag) =>
        item.tags.includes(tag)
      );

      return (
        (!shouldConsiderDates || hasValidDates) &&
        isWithinDateRange &&
        hasAllSelectedTags
      );
    });
  }, [data, selectedTags, dateRange, minMaxDate]);

  return (
    <ThemeProvider theme={theme}>
      {encounteredError.occurred ? (
        <Error error={encounteredError.message} />
      ) : (
        <>
          <Head title={title} />
          <MainBody
            data={data}
            filteredData={filteredData}
            facets={facets}
            dateRange={dateRange}
            setDateRange={setDateRange}
            minMaxDate={minMaxDate}
          />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
