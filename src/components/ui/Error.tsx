import { Alert, Container, Typography } from "@mui/material";

interface Props {
  error: string;
}

/**
 * Error is a functional component that displays an error message.
 *
 * Props:
 * - error: The error message to be displayed.
 *
 * This component uses Material-UI's Container, Typography, and Alert components.
 * The Container component is used to center the content vertically and horizontally in the container.
 *
 * The Typography component is used to display a headline for the error,
 * and the Alert component is used to display the error message.
 */
const Error: React.FC<Props> = ({ error }) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4">Something went wrong!</Typography>
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    </Container>
  );
};

export default Error;
