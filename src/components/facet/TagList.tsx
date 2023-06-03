import React from "react";
import { Checkbox, FormControlLabel, List, ListItem } from "@mui/material";
import { useSelectedTags } from "../../contexts/SelectedTagsContext";
import { IOccurrence } from "../../types/interfaces";

interface TagListProps {
  tags: IOccurrence[];
}

/**
 * TagList is a component for displaying a list of tags each with a checkbox.
 * The selected tags are managed via context provided by SelectedTagsContext.
 *
 * Props:
 * - tags: An array of IOccurrence objects. Each object represents a tag with a 'key' and a 'value'.
 *
 * This component uses the addTag and removeTag functions from the SelectedTagsContext to add and remove tags
 * to and from the selection when the checkbox for a tag is checked or unchecked.
 *
 * When the checkbox for a tag is clicked, it triggers the 'tagSelectHandler' function which checks if the tag
 * is already selected using the 'isTagSelected' function from the context. If it is selected, it is removed,
 * otherwise it is added to the selection.
 *
 * For each tag, a ListItem component is created containing a FormControlLabel component.
 * This component includes a Checkbox component and a label displaying the tag's key and value.
 */
const TagList: React.FC<TagListProps> = ({ tags }) => {
  const { selectedTags, isTagSelected, removeTag, addTag } = useSelectedTags();
  const tagSelectHandler = (tag: string) => {
    if (isTagSelected(tag)) {
      removeTag(tag);
    } else {
      addTag(tag);
    }
  };
  return (
    <List>
      {tags.map((tag) => (
        <ListItem key={tag.key}>
          <FormControlLabel
            key={tag.key}
            control={
              <Checkbox
                checked={selectedTags.has(tag.key)}
                onChange={() => tagSelectHandler(tag.key)}
              />
            }
            label={`${tag.key} - ${tag.value}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TagList;
