import { useSelectedTags } from "../../contexts/SelectedTagsContext";
import { Chip, Grid } from "@mui/material";

/**
 * ActiveTags component is a functional component that shows the active tags.
 *
 * This component uses the context from SelectedTagsContext for selected tags,
 * functions to add and remove tags, and to check if a tag is selected.
 *
 * The removeTagHandler function removes a tag from the selection
 * if it is currently selected; otherwise, it adds the tag to the selection.
 *
 * The component renders a Grid container. Inside this container, it maps over the selected tags
 * and creates a Grid item for each one. Each Grid item contains a Chip component from Material-UI
 * that displays the tag and allows it to be clicked to remove it.
 */
const ActiveTags = () => {
  const { selectedTags, isTagSelected, addTag, removeTag } = useSelectedTags();

  const removeTagHandler = (tag: string) => {
    if (isTagSelected(tag)) {
      removeTag(tag);
    } else {
      addTag(tag);
    }
  };
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
