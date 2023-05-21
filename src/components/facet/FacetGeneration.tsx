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

interface Props {
  AppData: IAppData;
  facets: IUniqueTags;
  filteredData: IData[] | undefined;
}

const buttonStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  p: "1rem",
};

const FacetGeneration: React.FC<Props> = ({
  AppData,
  facets,
  filteredData,
}) => {
  const [generalTags, setGeneralTags] = useState<IDomainOccurrence | null>();
  const [currentPage, setCurrentPage] = useState<IRecord>({});
  const [tagOccurrenceMap, setTagOccurrenceMap] = useState<ITagOccurrence>({});
  const tagsPerPage: number = 5;
  const { selectedTags, clearSelectedTags } = useSelectedTags();

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
      </FormGroup>
      <Box component="div" sx={buttonStyle}>
        <Button variant="contained" size="large" onClick={clearSelectedTags}>
          Reset
        </Button>
      </Box>
    </>
  );
};
export default FacetGeneration;
