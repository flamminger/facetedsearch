import {Data, FacetConstraintMap, JsonData, TagPairs} from "../types/interfaces";


/**
 * fetch json data from url
 * @param url
 */
export const getJson = async (url: string) => {
    try {
        return fetch(url).then((res) => res.json());
    } catch (e) {
        throw e;
    }
};


/**
 * gets facets from FacetConstraintMap
 * @param data object from input Json
 */
export const getFacets = (data: JsonData) => {
    const faceConstrainMap: FacetConstraintMap = data.data.facetConstraintMap;
    let facets: TagPairs = {};
    for (const key in faceConstrainMap) {
        let currentKey = key;
        let currentArray = faceConstrainMap[key];
        let items = new Set(currentArray);
        if (!facets[currentKey]) {
            facets[currentKey] = items;
        }
    }
    console.log(facets);
return facets;
}




export const getTags = (data: JsonData) => {
    const entries = data.data.data;
    let tagPairs = [];
    let tags: TagPairs = {};
    for (const entry of entries) {
        if (entry.value && entry.tags) {
            tags[entry.value] = new Set(entry.tags);
            tagPairs.push(tags);
        }
    }
    console.log(tagPairs)
    return tagPairs;
}
