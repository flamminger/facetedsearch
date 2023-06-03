import { Grid } from "@mui/material";
import AppTitle from "../ui/AppTitle";
import ActiveTags from "../ui/ActiveTags";
import React from "react";

interface Props {
  title: string;
}

/**
 * The Head component serves as a container for the AppTitle and ActiveTags components. It displays
 * the title of the app and the currently active (selected) tags.
 *
 * Props:
 * - title: A string representing the title of the application.
 *
 * This component is built using the Grid container from Material-UI for a responsive layout.
 * It contains two Grid items: one for the AppTitle and one for the ActiveTags component.
 *
 * On screens smaller than medium size (xs to sm in Material-UI's breakpoints), each Grid item
 * takes up the full width of the screen, stacking vertically. On medium and larger screens (md and up),
 * the AppTitle takes up one third of the width (4 out of 12 columns) and ActiveTags takes up the remaining
 * two thirds (8 out of 12 columns), displaying side by side.
 */
const Head: React.FC<Props> = ({ title }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <AppTitle title={title} />
      </Grid>
      <Grid item xs={12} md={8}>
        <ActiveTags />
      </Grid>
    </Grid>
  );
};

export default Head;
