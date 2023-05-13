import React from "react";
import {
    Checkbox,
    FormControlLabel,
} from "@mui/material";

interface Occurrence {
    key: string;
    value: number;
}

const TagList: React.FC<{ tags: Occurrence[] }> = ({ tags }) => {
    return (
        <>
            {tags.map((tag) => (
                <FormControlLabel
                    key={tag.key}
                    control={<Checkbox />}
                    label={`${tag.key} - ${tag.value}`}
                />
            ))}
        </>
    );
};

export default TagList;