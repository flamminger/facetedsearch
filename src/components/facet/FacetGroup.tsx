import { IDomainOccurrence, IRecord } from "../../types/interfaces";
import React, { useCallback } from "react";
import FacetCategory from "./FacetCategory";

interface FacetGroupProps {
  generalTags: IDomainOccurrence;
  currentPage: IRecord;
  tagsPerPage: number;
  pageChangeHandler: (category: string, page: number) => void;
}

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
