import { Container, Grid } from "@mui/material";
import AppTitle from "../ui/AppTitle";
import ActiveTags from "../ui/ActiveTags";
import React from "react";

interface Props {
  title: string;
}

const Head: React.FC<Props> = ({ title }) => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <AppTitle title={title} />
        </Grid>
        <Grid item xs={12} md={8}>
          <ActiveTags />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Head;
