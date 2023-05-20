import React from "react";
import { Checkbox, FormControlLabel, List, ListItem } from "@mui/material";
import { useSelectedTags } from "../../contexts/SelectedTagsContext";
import { IOccurrence } from "../../types/interfaces";

interface TagListProps {
  tags: IOccurrence[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  const { selectedTags, setSelectedTags } = useSelectedTags();
  const tagSelectHandler = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
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
                checked={selectedTags.includes(tag.key)}
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
