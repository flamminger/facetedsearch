import { Container, Slider, Typography } from "@mui/material";
import React from "react";

interface Props {
  dateRange: [number, number];
  setDateRange: (dateRange: [number, number]) => void;
  minMaxDate: [number, number];
}

/**
 * `DateSlider` component provides a slider interface for selecting a date range.
 *
 * @component
 * @prop {[number, number]} dateRange - The currently selected date range.
 * @prop {(dateRange: [number, number]) => void} setDateRange - Function to set the selected date range.
 * @prop {[number, number]} minMaxDate - The minimum and maximum dates that can be selected.
 */
const DateSlider: React.FC<Props> = ({
  dateRange,
  setDateRange,
  minMaxDate,
}) => {
  const marks = [
    {
      value: minMaxDate[0],
      label: new Date(minMaxDate[0]).getFullYear(),
    },
    {
      value: minMaxDate[1],
      label: new Date(minMaxDate[1]).getFullYear(),
    },
  ];
  return (
    <Container sx={{ pt: 2 }}>
      <Typography
        sx={{ display: "flex", justifyContent: "center" }}
        variant="body2"
      >
        Period:
      </Typography>
      <Slider
        sx={{ pt: 0 }}
        value={dateRange}
        min={minMaxDate[0]}
        max={minMaxDate[1]}
        onChange={(event, newValue) =>
          setDateRange(newValue as [number, number])
        }
        valueLabelFormat={(x) => new Date(x).toLocaleDateString()}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Container>
  );
};

export default DateSlider;
