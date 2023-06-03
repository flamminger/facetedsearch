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
