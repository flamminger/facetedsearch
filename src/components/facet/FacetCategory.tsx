import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TagList from "./TagList";
import { IOccurrence } from "../../types/interfaces";
import React from "react";
import FacetCategorySearch from "./FacetCategorySearch";

interface FacetCategoryProps {
  categoryName: string;
  categoryTags: IOccurrence[];
  tags: IOccurrence[];
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
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="h6" sx={{ pl: 1 }}>
            {categoryName}{" "}
          </Typography>
          <Chip
            label={tags.reduce((acc, cur) => acc + cur.value, 0)}
            sx={{ mr: 1 }}
          ></Chip>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Container>
          <FacetCategorySearch tags={categoryTags} />
          <TagList tags={categoryTags} />

          <Box display="flex" justifyContent="space-between">
            {categoryTags.length > tags.length && (
              <Button variant="contained" size="small" onClick={onLoadMore}>
                <AddIcon fontSize="small" />
              </Button>
            )}
            {tags.length > 5 && (
              <Button variant="contained" size="small" onClick={onLoadLess}>
                <RemoveIcon fontSize="small" />
              </Button>
            )}
          </Box>
        </Container>
      </AccordionDetails>
    </Accordion>
  );
};

export default FacetCategory;
