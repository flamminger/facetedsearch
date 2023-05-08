import {FacetConstraintMap, JsonData} from "../types/interfaces";


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

interface FacetSet {
    [key: string]: Set<string>;
}
export const getFacets = (data: JsonData) => {
    const tags: FacetConstraintMap = data.data.facetConstraintMap;
    console.log(tags);
    let facets: FacetSet = {};
    for (const key in tags) {
        let currentKey = key;
        let currentArray = tags[key];
        let items = new Set(currentArray);
        if (!facets[currentKey]) {
            facets[currentKey] = items;
        }
    }
    console.log(facets)
return facets;
}
