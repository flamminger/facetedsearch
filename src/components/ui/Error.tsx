import { Alert, Container, Typography } from "@mui/material";

interface Props {
  error: string;
}

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
