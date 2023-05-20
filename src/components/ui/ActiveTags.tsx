import { useSelectedTags } from "../../contexts/SelectedTagsContext";
import { Button, Container } from "@mui/material";

const ActiveTags = () => {
  const { selectedTags, setSelectedTags } = useSelectedTags();

  const removeTagHandler = (tag: string) => {
    setSelectedTags((prevTags) => {
      return prevTags.filter((prevTag) => prevTag !== tag);
    });
  };

  return (
    <Container sx={{ pt: 1, pb: 1 }}>
      {selectedTags.map((tag) => (
        <Button onClick={() => removeTagHandler(tag)}>{tag}</Button>
      ))}
    </Container>
  );
};

export default ActiveTags;
