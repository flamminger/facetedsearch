import { Chip, Container, Grid, Link } from "@mui/material";
import React from "react";
import { MRT_Row } from "material-react-table";
import { IData } from "../../types/interfaces";

interface Props {
  row: MRT_Row<IData>;
  selectedTags: Set<string>;
  tagSelectHandler: (tag: string) => void;
}

const DetailPanel: React.FC<Props> = ({
  row,
  selectedTags,
  tagSelectHandler,
}) => {
  return (
    <Container>
      <p>
        <strong>Title: </strong>
        <Link href={`https://gams.uni-graz.at/${row.original.value}`}>
          {row.original.txt}
        </Link>
      </p>
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
