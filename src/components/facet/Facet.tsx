import {Data, JsonData, TagSet} from "../../types/interfaces";
import React, {useEffect, useState} from "react";
import {Button, FormGroup, Typography,} from "@mui/material";
import TagList from "./TagList";

interface Props {
    data: JsonData;
    facets: TagSet;
}

interface Occurrence {
    key: string;
    value: number;
}

interface DomainOccurrence {
    [key: string]: Occurrence[];

}

interface Record {
    [key: string]: number;
}

const Facet: React.FC<Props> = (props) => {
    const [generalTags, setGeneralTags] = useState<DomainOccurrence | null>();
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [visibleTags, setVisibleTags] = useState<DomainOccurrence | null>(null);
    const [currentPage, setCurrentPage] = useState<Record>({});
    const tagsPerPage: number = 10;

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

                    tagsOccurence.push({key: tag, value: occurrence});
                }

                availableTags[category] = tagsOccurence.sort((a, b) => b.value - a.value).slice(0, 30);
            }

            setGeneralTags(availableTags);
        };
        availableTags(props.facets);
    }, [props.data.data.data, props.facets]);

    // useEffect(() => {
    //     if (generalTags) {
    //         const start = (currentPage - 1) * tagsPerPage;
    //         const end = start + tagsPerPage;
    //         const visibleTags: DomainOccurrence = {};
    //
    //         for (const category in generalTags) {
    //             const tags = generalTags[category].slice(start, end);
    //             visibleTags[category] = tags;
    //         }
    //         setVisibleTags(visibleTags);
    //     }
    // }, [currentPage, generalTags]);

    const tagSelectHandler = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const pageChangeHandler = (category: string, page: number) => {
        setCurrentPage((prevState) => ({
            ...prevState,
            [category]: page,
        }));
    };


    // const filterData = props.data.data.data.tags.filter((item) => {
    //   return (
    //     selectedTags.length === 0 || selectedTags.some((tag) => tag.includes(tag))
    //   );
    // });
    console.log(generalTags);
    return (
        <FormGroup>
            {generalTags &&
                Object.entries(generalTags).map(([category, tags]) => {
                    const categoryTags = tags.slice(
                        0,
                        (currentPage[category] || 1) * tagsPerPage
                    );

                    const handleLoadMoreTags = () => {
                        pageChangeHandler(category, (currentPage[category] || 1) + 1);
                    };

                    return (
                        <div key={category}>
                            <Typography variant="h6">{category}</Typography>
                            <TagList tags={categoryTags} />
                            {categoryTags.length < tags.length && (
                                <Button variant="contained" onClick={handleLoadMoreTags}>
                                    Load More
                                </Button>
                            )}
                        </div>
                    );
                })}
        </FormGroup>
    );
};
export default Facet;
