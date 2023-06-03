import {
  IAppData,
  IData,
  IDomainOccurrence,
  IOccurrence,
  IRecord,
  ITagOccurrence,
  IUniqueTags,
} from "../../types/interfaces";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, FormGroup } from "@mui/material";
import FacetGroup from "./FacetGroup";
import { useSelectedTags } from "../../contexts/SelectedTagsContext";
import DateSelectSwitch from "../date/DateSelectSwitch";

interface Props {
  AppData: IAppData;
  facets: IUniqueTags;
  filteredData: IData[] | undefined;
  dateRange: [number, number];
  setDateRange: (dateRange: [number, number]) => void;
  minMaxDate: [number, number];
}

const buttonStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  p: "1rem",
};

/**
 * `FacetGeneration` component generates the facet filters for the dataset.
 * It calculates the occurrence of each tag and the date range and passes
 * them to the `FacetGroup` and `DateSelectSwitch` components respectively.
 *
 * @component
 * @prop {IAppData} AppData - The entire application data.
 * @prop {IUniqueTags} facets - Unique tags in the data.
 * @prop {IData[] | undefined} filteredData - Filtered data based on selected tags and date range.
 * @prop {[number, number]} dateRange - The selected date range.
 * @prop {(dateRange: [number, number]) => void} setDateRange - Function to set the selected date range.
 * @prop {[number, number]} minMaxDate - Minimum and maximum dates in the data.
 */
const FacetGeneration: React.FC<Props> = ({
  AppData,
  facets,
  filteredData,
  dateRange,
  setDateRange,
  minMaxDate,
}) => {
  const [generalTags, setGeneralTags] = useState<IDomainOccurrence | null>();
  const [currentPage, setCurrentPage] = useState<IRecord>({});
  const [tagOccurrenceMap, setTagOccurrenceMap] = useState<ITagOccurrence>({});
  const [startDate, setStartDate] = useState(
    new Date(minMaxDate[0]).toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date(minMaxDate[1]).toISOString().slice(0, 10)
  );
  const tagsPerPage: number = 5;
  const { selectedTags, clearSelectedTags } = useSelectedTags();

  /**
   * Calculates the tag occurrence map for the current data and selected tags
   */
  useEffect(() => {
    const newTagOccurrenceMap: { [tag: string]: number } = {};
    if (filteredData) {
      for (const item of filteredData) {
        const dataTags: string[] = item.tags;
        for (const tag of dataTags) {
          newTagOccurrenceMap[tag] = (newTagOccurrenceMap[tag] || 0) + 1;
        }
      }
    }

    setTagOccurrenceMap(newTagOccurrenceMap);
  }, [AppData.data.data, selectedTags, filteredData]);

  /**
   * Calculates the occurrence of each tag and sorts them by occurrence
   */
  useEffect(() => {
    const availableTags: IDomainOccurrence = {};

    for (const category in facets) {
      const tags = facets[category];
      const tagsOccurrence: IOccurrence[] = [];

      for (const tag of tags) {
        const occurrence = tagOccurrenceMap[tag] || 0;
        tagsOccurrence.push({ key: tag, value: occurrence });
      }

      availableTags[category] = tagsOccurrence.sort(
        (a, b) => b.value - a.value
      );
    }

    setGeneralTags(availableTags);
  }, [facets, tagOccurrenceMap]);

  /**
   * Updates the start and end dates whenever the minimum and maximum dates change
   */
  useEffect(() => {
    setStartDate(new Date(minMaxDate[0]).toISOString().slice(0, 10));
    setEndDate(new Date(minMaxDate[1]).toISOString().slice(0, 10));
  }, [minMaxDate]);

  const pageChangeHandler = useCallback((category: string, page: number) => {
    setCurrentPage((prevState) => ({
      ...prevState,
      [category]: page,
    }));
  }, []);

  return (
    <>
      <FormGroup>
        {generalTags && (
          <FacetGroup
            generalTags={generalTags}
            currentPage={currentPage}
            tagsPerPage={tagsPerPage}
            pageChangeHandler={pageChangeHandler}
          />
        )}
        <DateSelectSwitch
          dateRange={dateRange}
          setDateRange={setDateRange}
          minMaxDate={minMaxDate}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </FormGroup>
      <Box component="div" sx={buttonStyle}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            clearSelectedTags();
            setDateRange(minMaxDate);
            setStartDate(new Date(minMaxDate[0]).toISOString().slice(0, 10));
            setEndDate(new Date(minMaxDate[1]).toISOString().slice(0, 10));
          }}
        >
          Reset
        </Button>
      </Box>
    </>
  );
};
export default FacetGeneration;
