import React from 'react';
import { Occurrence } from "../../types/interfaces";
import {Autocomplete, Box, TextField} from "@mui/material";
import {useSelectedTags} from "../../contexts/SelectedTagsContext";

interface Props {
    tags: Occurrence[];

}

const FacetCategorySearch: React.FC<Props> = ({ tags }) => {
    const { selectedTags, setSelectedTags } = useSelectedTags();
    const labels = Array.from(new Set(tags.map(tag => tag.key))).filter(label => !selectedTags.includes(label));
    const [autocompleteValue, setAutocompleteValue] = React.useState<string | null>(null);
    const [textFieldValue, setTextFieldValue] = React.useState('');


    const tagSelectHandler = (event: React.ChangeEvent<{}>, value: string | null) => {
        if (value) {
            setSelectedTags([...selectedTags, value]);
        }
        setTextFieldValue(''); // Clear the input after selection
        setAutocompleteValue(null); // Reset the value after selection
    }

    return (
        <Box component="div" sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Autocomplete
            id="searchTags"
            options={labels}
            value={autocompleteValue}
            onChange={tagSelectHandler}
            inputValue={textFieldValue}
            onInputChange={(event, newInputValue) => {
                setTextFieldValue(newInputValue);
            }}
            filterSelectedOptions
            sx={{ width: 300 }}
            renderInput={(params) => (<TextField {...params} variant="standard" label="Search..." />)
        }
        />
        </Box>
    );
}

export default FacetCategorySearch;