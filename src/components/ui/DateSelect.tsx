import { Box, TextField } from "@mui/material";

interface Props {
  dateRange: [number, number];
  setDateRange: (dateRange: [number, number]) => void;
  startDate: string;
  endDate: string;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
}

const DateSelect: React.FC<Props> = ({
  dateRange,
  setDateRange,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const handleStartDateChange = (startDate: string) => {
    const date = new Date(startDate);
    if (!isNaN(date.getTime())) {
      setDateRange([date.getTime(), dateRange[1]]);
      setStartDate(startDate);
    }
  };

  const handleEndDateChange = (endDate: string) => {
    const date = new Date(endDate);
    if (!isNaN(date.getTime())) {
      setDateRange([dateRange[0], date.getTime()]);
      setEndDate(endDate);
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" width="100%" pt={4}>
      <TextField
        id="startDate"
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        onBlur={() => handleStartDateChange(startDate)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleEndDateChange(startDate);
          }
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="endDate"
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        onBlur={() => handleEndDateChange(endDate)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleStartDateChange(endDate);
          }
        }}
      />
    </Box>
  );
};

export default DateSelect;
