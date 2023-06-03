import { Chip, Container, Grid, Link } from "@mui/material";
import React from "react";
import { MRT_Row } from "material-react-table";
import { IData } from "../../types/interfaces";

interface Props {
  row: MRT_Row<IData>;
  selectedTags: Set<string>;
  tagSelectHandler: (tag: string) => void;
}

/**
 * The DetailPanel component renders the detailed information of a row item.
 * The details include the title of the item, start and end dates, and a list of tags.
 *
 * Props:
 * - row: A row object that contains original item data.
 * - selectedTags: A set of currently selected tags.
 * - tagSelectHandler: A function to handle tag selection.
 *
 * This component makes use of the Container and Grid components from Material-UI for layout purposes.
 *
 * It also uses the Chip component to present each tag associated with an item.
 * The variant of the Chip (either filled or outlined) is determined by whether the tag is currently selected.
 * Clicking on a Chip triggers the tagSelectHandler function.
 */
const DetailPanel: React.FC<Props> = ({
  row,
  selectedTags,
  tagSelectHandler,
}) => {
  return (
    <Container>
      <p>
        <strong>Title: </strong>
        <Link href={row.original.value} target="_blank">
          {row.original.txt}
        </Link>
      </p>
      <div>
        <p>
          <strong>From: </strong>
          {row.original.date && row.original.date.startDate
            ? new Date(row.original.date.startDate).toLocaleDateString()
            : "NA"}
        </p>
        <p>
          <strong>To: </strong>
          {row.original.date && row.original.date.endDate
            ? new Date(row.original.date.endDate).toLocaleDateString()
            : "NA"}
        </p>
      </div>
      <Grid container spacing={0.5} wrap="wrap">
        {row.original.tags.map((tag, index) => (
          <Grid key={index} item xs="auto">
            <Chip
              label={tag}
              size="small"
              sx={{ fontSize: "0.75rem" }}
              variant={selectedTags.has(tag) ? "filled" : "outlined"}
              onClick={() => tagSelectHandler(tag)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DetailPanel;
