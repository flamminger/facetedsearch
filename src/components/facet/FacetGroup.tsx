import { DomainOccurrence, Record } from "../../types/interfaces";
import React from "react";
import FacetCategory from "./FacetCategory";

interface FacetGroupProps {
  generalTags: DomainOccurrence;
  currentPage: Record;
  tagsPerPage: number;
  pageChangeHandler: (category: string, page: number) => void;
}

const FacetGroup: React.FC<FacetGroupProps> = ({
  generalTags,
  currentPage,
  tagsPerPage,
  pageChangeHandler,
}) => {
  return (
    <>
      {generalTags &&
        Object.entries(generalTags).map(([category, tags]) => {
          const categoryTags = tags.slice(
            0,
            (currentPage[category] || 1) * tagsPerPage
          );

          const showMoreTagsHandler = () => {
            pageChangeHandler(category, (currentPage[category] || 1) + 1);
          };
          const showLessTagsHandler = () => {
            pageChangeHandler(category, (currentPage[category] || 1) - 1);
          };

          return (
            <FacetCategory
              key={category}
              categoryName={category}
              tags={categoryTags}
              categoryTags={tags}
              onLoadMore={showMoreTagsHandler}
              onLoadLess={showLessTagsHandler}
            />
          );
        })}
    </>
  );
};

export default FacetGroup;
