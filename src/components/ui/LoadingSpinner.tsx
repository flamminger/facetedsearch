import { Box, CircularProgress } from "@mui/material";

/**
 * The LoadingSpinner component is a simple functional component
 * that renders a centered circular progress spinner from Material-UI.
 *
 * This component uses Material-UI's Box and CircularProgress components.
 * The Box component is a flexible container that can be used to customize
 * layout, styling, and spacing in your application.
 * In this case, it's used to center the CircularProgress component both vertically and horizontally.
 */
const LoadingSpinner = () => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
