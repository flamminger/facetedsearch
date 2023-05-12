import { Data, JsonData, TagOcc, TagSet } from "../../types/interfaces";
import React, { useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

interface Props {
  data: JsonData;
  facets: TagSet;
  tags: TagSet;
}

interface Occurence {
  key: string;
  value: number;
}

const Facet: React.FC<Props> = (props) => {
  const [generalTags, setGeneralTags] = React.useState<Occurence[]>();
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  useEffect(() => {
    const availableTags = (facets: TagSet) => {
      const tags = Object.values(facets);
      const data: Data[] = props.data.data.data;
      let availableTags: TagOcc = {};
      for (const tagArray of tags) {
        for (const tag of tagArray) {
          for (const dataItem of data) {
            const dataTags: string[] = dataItem.tags;
            if (dataTags.includes(tag) && !availableTags[tag]) {
              availableTags[tag] = 1;
            } else if (dataTags.includes(tag)) {
              availableTags[tag]++;
            }
          }
        }
      }
      const mapped = Object.entries(availableTags).map(([key, value]) => ({
        key,
        value,
      }));
      setGeneralTags(mapped);
    };
    availableTags(props.facets);
  }, []);

  const tagSelectHandler = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // const filterData = props.data.data.data.tags.filter((item) => {
  //   return (
  //     selectedTags.length === 0 || selectedTags.some((tag) => tag.includes(tag))
  //   );
  // });
  console.log(generalTags);
  return (
    <FormGroup>
      {Object.entries(props.facets).map(([key]) => (
        <div key={key}>
          <Typography variant="h6">{key}</Typography>
          {generalTags &&
            generalTags.map((tag) => (
              <FormControlLabel
                key={tag.key}
                control={<Checkbox />}
                label={`${tag.key} (${tag.value})`}
              />
            ))}
        </div>
      ))}
    </FormGroup>
  );
};
export default Facet;
