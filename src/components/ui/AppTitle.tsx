import { Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
}

const AppTitle: React.FC<Props> = ({ title }) => {
  return (
    <Typography variant="h3" sx={{ pl: 1, pt: 2, pb: 3 }}>
      {title}
    </Typography>
  );
};

export default AppTitle;
