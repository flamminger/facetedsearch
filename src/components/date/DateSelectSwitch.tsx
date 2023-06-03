import { useState } from "react";
import { Container, FormControlLabel, Switch } from "@mui/material";
import DateSlider from "./DateSlider";
import DateField from "./DateField";

interface Props {
  dateRange: [number, number];
  setDateRange: (dateRange: [number, number]) => void;
  minMaxDate: [number, number];
  startDate: string;
  endDate: string;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
}

/**
 * `DateSelectSwitch` component provides the user with the ability to switch between two date selection methods:
 * 1. Input fields for direct date entry (default)
 * 2. A date range slider
 *
 * Depending on the toggle switch state, it either renders the `DateField` or `DateSlider` component.
 *
 * @component
 * @prop {[number, number]} dateRange - The currently selected date range.
 * @prop {(dateRange: [number, number]) => void} setDateRange - Function to set the selected date range.
 * @prop {[number, number]} minMaxDate - The minimum and maximum dates that can be selected.
 * @prop {string} startDate - The selected start date.
 * @prop {string} endDate - The selected end date.
 * @prop {(startDate: string) => void} setStartDate - Function to set the selected start date.
 * @prop {(endDate: string) => void} setEndDate - Function to set the selected end date.
 */
const DateSelectSwitch: React.FC<Props> = ({
  dateRange,
  setDateRange,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  minMaxDate,
}) => {
  const [isSlider, setIsSlider] = useState<boolean>(false);

  /**
   * Handles the state change of the toggle switch.
   * When toggled, it updates the `isSlider` state to reflect the current selection method.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the toggle switch.
   */
  const SwitchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlider(event.target.checked);
  };

  return (
    <Container sx={{ pt: 2 }}>
      <FormControlLabel
        control={<Switch checked={isSlider} onChange={SwitchChangeHandler} />}
        label={isSlider ? "Switch to Input" : "Switch to Slider"}
      />
      {isSlider ? (
        <DateSlider
          dateRange={dateRange}
          setDateRange={setDateRange}
          minMaxDate={minMaxDate}
        />
      ) : (
        <DateField
          dateRange={dateRange}
          setDateRange={setDateRange}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      )}
    </Container>
  );
};

export default DateSelectSwitch;
