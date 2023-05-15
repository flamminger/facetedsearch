import {
  Data,
  AppData,
  UniqueTags,
  Occurrence,
  DomainOccurrence,
  Record,
} from "../../types/interfaces";
import React, { useEffect, useState } from "react";
import { FormGroup } from "@mui/material";
import FacetGroup from "./FacetGroup";

interface Props {
  AppData: AppData;
  facets: UniqueTags;
}

const Facet: React.FC<Props> = ({ AppData, facets }) => {
  const [generalTags, setGeneralTags] = useState<DomainOccurrence | null>();
  const [currentPage, setCurrentPage] = useState<Record>({});
  const tagsPerPage: number = 5;

  useEffect(() => {
    /**
     * gets tag + occurrence count
     * @param facets
     */
    const availableTags = (facets: UniqueTags) => {
      const data: Data[] = AppData.data.data;
      const availableTags: DomainOccurrence = {};

      // count tag occurrences
      const tagOccurrenceMap: { [tag: string]: number } = {};
      for (const item of data) {
        const dataTags: string[] = item.tags;
        for (const tag of dataTags) {
          tagOccurrenceMap[tag] = (tagOccurrenceMap[tag] || 0) + 1;
        }
      }

      for (const category in facets) {
        const tags = facets[category];
        const tagsOccurrence: Occurrence[] = [];

        for (const tag of tags) {
          const occurrence = tagOccurrenceMap[tag] || 0;
          tagsOccurrence.push({ key: tag, value: occurrence });
        }
        availableTags[category] = tagsOccurrence.sort(
          (a, b) => b.value - a.value
        );
      }
      setGeneralTags(availableTags);
    };
    availableTags(facets);
  }, [AppData.data.data, facets]);

  const pageChangeHandler = (category: string, page: number) => {
    setCurrentPage((prevState) => ({
      ...prevState,
      [category]: page,
    }));
  };

  return (
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
  );
};
export default Facet;
