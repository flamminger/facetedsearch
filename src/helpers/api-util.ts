import {Data, FacetConstraintMap, JsonData, TagSet,} from "../types/interfaces";

/**
 * fetch json data from url
 * @param url
 */
export const getJson = async (url: string): Promise<JsonData> => {
  try {
    const response = await fetch (url);
    if (!response.ok) {
      throw new Error(`Could not fetch data from ${url}!`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch JSON {error.message}`);
  }
};

/**
 * gets facets from FacetConstraintMap
 * @param data object from input Json
 */
export const getFacets = (data: JsonData): TagSet => {
  const faceConstrainMap: FacetConstraintMap = data.data.facetConstraintMap;
  const facets: TagSet = {};
  for (const key in faceConstrainMap) {
    const currentArray = faceConstrainMap[key];
    const items = new Set(currentArray);
    const itemsArray = Array.from(items);
    if (!facets[key]) {
      facets[key] = itemsArray;
    }
  }
  return facets;
};

/**
 * gets tags from data
 * @param data
 */
export const getTags = (data: JsonData): TagSet => {
  const entries: Data[] = data.data.data;
  const entryTags: TagSet = {};
  for (const {value, tags} of entries) {
    if (value && tags) {
      entryTags[value] = Array.from(new Set(tags));
    }
  }
  return entryTags;
};
