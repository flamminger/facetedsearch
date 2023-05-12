import {Data, JsonData, TagSet} from "../../types/interfaces";
import React, {useEffect} from "react";
import {Checkbox, FormControlLabel, FormGroup, Typography,} from "@mui/material";

interface Props {
    data: JsonData;
    facets: TagSet;
    tags: TagSet;
}

interface Occurrence {
    key: string;
    value: number;
}

interface DomainOccurrence {
    [key: string]: Occurrence[];

}

const Facet: React.FC<Props> = (props) => {
    const [generalTags, setGeneralTags] = React.useState<DomainOccurrence | null>();
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [sliceTag, setSliceTag] = React.useState<Occurrence>();

    useEffect(() => {
        /**
         * gets tag + occurrence count
         * @param facets
         */
        const availableTags = (facets: TagSet) => {
            const data: Data[] = props.data.data.data;
            const availableTags: DomainOccurrence = {};

            for (const category in facets) {
                const tags = facets[category];
                const tagsOccurence: Occurrence[] = [];

                for (const tag of tags) {
                    let occurrence = 0;

                    for (const dataItem of data) {
                        const dataTags: string[] = dataItem.tags;

                        if (dataTags.includes(tag)) {
                            occurrence++;
                        }
                    }

                    tagsOccurence.push({ key: tag, value: occurrence });
                }

                availableTags[category] = tagsOccurence.sort((a, b) => b.value - a.value).slice(0, 30);
            }

            setGeneralTags(availableTags);
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
    return (
         <FormGroup>
            {generalTags &&
                Object.entries(generalTags).map(([category, tags]) => (
                    <div key={category}>
                        <Typography variant="h6">{category}</Typography>
                        {tags.slice(0, 10).map((tag) => (
                            <FormControlLabel key={tag.key} control={<Checkbox/>} label={`${tag.key} - ${tag.value} `}/>
                        ))}
                    </div>
                ))
            }
        </FormGroup>
    );
};
export default Facet;
