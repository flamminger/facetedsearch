import { Box, TextField } from "@mui/material";

interface Props {
  dateRange: [number, number];
  setDateRange: (dateRange: [number, number]) => void;
  startDate: string;
  endDate: string;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
}

/**
 * `DateField` component displays two date input fields for selecting a start and end date.
 * On each change, it validates the input and if valid, updates the `dateRange` state variable in the parent component.
 *
 * @component
 * @prop {[number, number]} dateRange - The selected date range.
 * @prop {(dateRange: [number, number]) => void} setDateRange - Function to set the selected date range.
 * @prop {string} startDate - The selected start date.
 * @prop {string} endDate - The selected end date.
 * @prop {(startDate: string) => void} setStartDate - Function to set the selected start date.
 * @prop {(endDate: string) => void} setEndDate - Function to set the selected end date.
 */
const DateField: React.FC<Props> = ({
  dateRange,
  setDateRange,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  /**
   * Handles the change in the start date input field.
   * Validates the input and if valid, updates the `dateRange` and `startDate` state variables.
   *
   * @param {string} startDate - The selected start date.
   */
  const startDateChangeHandler = (startDate: string) => {
    const date = new Date(startDate);
    if (!isNaN(date.getTime())) {
      setDateRange([date.getTime(), dateRange[1]]);
      setStartDate(startDate);
    }
  };

  /**
   * Handles the change in the end date input field.
   * Validates the input and if valid, updates the `dateRange` and `endDate` state variables.
   *
   * @param {string} endDate - The selected end date.
   */
  const endDateChangeHandler = (endDate: string) => {
    const date = new Date(endDate);
    if (!isNaN(date.getTime())) {
      setDateRange([dateRange[0], date.getTime()]);
      setEndDate(endDate);
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <TextField
        id="startDate"
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        onBlur={() => startDateChangeHandler(startDate)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            endDateChangeHandler(startDate);
          }
        }}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        color="secondary"
        fullWidth
        margin="normal"
      />
      <TextField
        id="endDate"
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        onBlur={() => endDateChangeHandler(endDate)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            startDateChangeHandler(endDate);
          }
        }}
        variant="outlined"
        color="secondary"
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default DateField;
