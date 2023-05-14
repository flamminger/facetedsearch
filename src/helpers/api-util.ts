import {Data, FacetConstraintMap, AppData, UniqueTags,} from "../types/interfaces";

/**
 * fetch json data from url
 * @param url
 */
export const getJson = async (url: string): Promise<AppData> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Could not fetch data from ${url}!`);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch JSON ${error.message}`);
        } else {
            throw new Error("Something went wrong!");
        }
    }
};

/**
 * gets facets from FacetConstraintMap
 * @param data object from input Json
 */
export const getFacets = (data: AppData): UniqueTags => {
    const faceConstrainMap: FacetConstraintMap = data.data.facetConstraintMap;
    const facets: UniqueTags = {};
    for (const [key, value] of Object.entries(faceConstrainMap)) {
        facets[key] = Array.from(new Set(value));
    }
    return facets;
};

/**
 * gets tags from data
 * @param data
 */
export const getTags = (data: AppData): UniqueTags => {
    const entries: Data[] = data.data.data;
    const entryTags: UniqueTags = {};
    for (const {value, tags} of entries) {
        if (value !== "" && tags.length > 0) {
            entryTags[value] = Array.from(new Set(tags));
        }
    }
    return entryTags;
};
