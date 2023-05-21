import React from "react";
import { Checkbox, FormControlLabel, List, ListItem } from "@mui/material";
import { useSelectedTags } from "../../contexts/SelectedTagsContext";
import { IOccurrence } from "../../types/interfaces";

interface TagListProps {
  tags: IOccurrence[];
}

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
