import { Box, TextField } from "@mui/material";

interface Props {
  dateRange: [number, number];
  setDateRange: (dateRange: [number, number]) => void;
  startDate: string;
  endDate: string;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
}

const DateField: React.FC<Props> = ({
  dateRange,
  setDateRange,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const startDateChangeHandler = (startDate: string) => {
    const date = new Date(startDate);
    if (!isNaN(date.getTime())) {
      setDateRange([date.getTime(), dateRange[1]]);
      setStartDate(startDate);
    }
  };

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
