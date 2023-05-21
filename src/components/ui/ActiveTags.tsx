import { useSelectedTags } from "../../contexts/SelectedTagsContext";
import { Chip, Grid } from "@mui/material";

const ActiveTags = () => {
  const { selectedTags, isTagSelected, addTag, removeTag } = useSelectedTags();

  const removeTagHandler = (tag: string) => {
    if (isTagSelected(tag)) {
      removeTag(tag);
    } else {
      addTag(tag);
    }
  };

  // const removeTagHandler = (tag: string) => {
  //   setSelectedTags((prevTags) => {
  //     return prevTags.filter((prevTag) => prevTag !== tag);
  //   });
  // };

  return (
    <Grid container spacing={1} sx={{ pt: 1, pb: 1 }} wrap="wrap">
      {Array.from(selectedTags).map((tag, index) => (
        <Grid key={index} item xs="auto">
          <Chip
            label={tag}
            onClick={() => removeTagHandler(tag)}
            variant="outlined"
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ActiveTags;
