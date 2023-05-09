import {JsonData, Data, FacetConstraintMap, TagPairs} from "../../types/interfaces";
import React, {useState} from "react";

interface Props {
    data: JsonData;
    facetConstraintMap: FacetConstraintMap
}


const Facet: React.FC<Props> = (Props) => {
    const [tagPairs, setTagPairs] = useState<TagPairs>({selectedTags: new Set<string>});


    const clickTagHandler = (tag: string) => {
        const {selectedTags} = tagPairs;
        if (selectedTags.has(tag)) {
            selectedTags.delete(tag);
        } else {
            selectedTags.add(tag);
        }
        setTagPairs({selectedTags});
    }

    const filterData = () => {
        const {data} = Props.data.data;
        const {selectedTags} = tagPairs;

        return data.filter(item => {
            for (const tag of selectedTags) {
                if (!item.tags.includes(tag)) {
                    return false;
                }
            }
            return true;
        })
    }

    const { facetConstraintMap } = Props.facetConstraintMap;
    const { selectedTags } = tagPairs;

    const allTags = Object.values(Props.facetConstraintMap).flat();

    // Generate a list of selected tags that are still available for selection
    const availableTags = allTags.filter(tag => !selectedTags.has(tag));

    // Filter data based on selected tags
    const filteredData = filterData();

    return (
        <>
        <div>
        <h2>Search</h2>
        {Array.from(selectedTags).map(tag => (
            <span key={tag} onClick={() => clickTagHandler(tag)}>
              {tag} &#x2715;
            </span>
        ))}

    </div>
        <div>
            <h3>Available Tags:</h3>
            {availableTags.map(tag => (
                <span key={tag} onClick={() => clickTagHandler(tag)}>
              {tag}
            </span>
            ))}
        </div>
        <div>
            <h3>Filtered Results:</h3>
            {filteredData.map(item => (
                <div key={item.value}>
                    <p>{item.txt}</p>
                    <p>{item.value}</p>
                    <p>{item.tags.join(", ")}</p>
                </div>
            ))}
        </div>
        </>
    )
};

export default Facet;