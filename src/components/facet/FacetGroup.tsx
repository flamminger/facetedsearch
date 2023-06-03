import { IDomainOccurrence, IRecord } from "../../types/interfaces";
import React, { useCallback } from "react";
import FacetCategory from "./FacetCategory";

interface FacetGroupProps {
  generalTags: IDomainOccurrence;
  currentPage: IRecord;
  tagsPerPage: number;
  pageChangeHandler: (category: string, page: number) => void;
}

/**
 * `FacetGroup` is a component that represents a group of facet categories used in a faceted search UI.
 * Each facet category has its tags, and each tag displays its occurrence in the dataset.
 * This component also provides the capability to show more or less tags per category, controlling the pagination.
 *
 * @component
 * @prop {IDomainOccurrence} generalTags - A mapping of the facet category to its tags with occurrences in the dataset.
 * @prop {IRecord} currentPage - A record that stores the current page of tags displayed for each category.
 * @prop {number} tagsPerPage - The maximum number of tags to be displayed per category per page.
 * @prop {(category: string, page: number) => void} pageChangeHandler - A handler function for changing the page of tags in a category.
 */
const FacetGroup: React.FC<FacetGroupProps> = ({
  generalTags,
  currentPage,
  tagsPerPage,
  pageChangeHandler,
}) => {
  const showMoreTagsHandler = useCallback(
    (category: string) => {
      pageChangeHandler(category, (currentPage[category] || 1) + 1);
    },
    [pageChangeHandler, currentPage]
  );

  const showLessTagsHandler = useCallback(
    (category: string) => {
      pageChangeHandler(category, (currentPage[category] || 1) - 1);
    },
    [pageChangeHandler, currentPage]
  );

  return (
    <>
      {generalTags &&
        Object.entries(generalTags).map(([category, tags]) => {
          const categoryTags = tags.slice(
            0,
            (currentPage[category] || 1) * tagsPerPage
          );

          return (
            <FacetCategory
              key={category}
              categoryName={category}
              tags={categoryTags}
              categoryTags={tags}
              onLoadMore={() => showMoreTagsHandler(category)}
              onLoadLess={() => showLessTagsHandler(category)}
            />
          );
        })}
    </>
  );
};

export default React.memo(FacetGroup);
