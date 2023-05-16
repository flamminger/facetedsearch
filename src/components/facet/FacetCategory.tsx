import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
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
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h6">{categoryName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
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
      </AccordionDetails>
    </Accordion>
  );
};

export default FacetCategory;
