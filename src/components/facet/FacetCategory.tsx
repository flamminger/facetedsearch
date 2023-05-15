import { Button, Typography } from "@mui/material";
import TagList from "./TagList";
import { Occurrence } from "../../types/interfaces";
import React from "react";

interface FacetCategoryProps {
  categoryName: string;
  categoryTags: Occurrence[];
  tags: Occurrence[];
  onLoadMore: () => void;
  onLoadLess: () => void;
}

const FacetCategory: React.FC<FacetCategoryProps> = ({
  categoryName,
  categoryTags,
  tags,
  onLoadMore,
  onLoadLess,
}) => {
  return (
    <div>
      <Typography variant="h6">{categoryName}</Typography>
      <TagList tags={tags} />
      {categoryTags.length > tags.length && (
        <Button variant="contained" onClick={onLoadMore}>
          Load More
        </Button>
      )}
      {tags.length > 5 && (
        <Button variant="contained" onClick={onLoadLess}>
          Load Less
        </Button>
      )}
    </div>
  );
};

export default FacetCategory;
