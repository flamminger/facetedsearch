import { Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
}

/**
 * AppTitle is a simple functional component that takes a title prop and
 * renders it in a Typography component from Material-UI. The variant prop
 * passed to the Typography component is "h3", which styles the text as an
 * h3 element. Some additional styling is applied via the sx prop.
 *
 * Props:
 * - title: The title to be displayed.
 */
const AppTitle: React.FC<Props> = ({ title }) => {
  return (
    <Typography variant="h3" sx={{ pl: 1, pt: 2, pb: 3 }}>
      {title}
    </Typography>
  );
};

export default AppTitle;
