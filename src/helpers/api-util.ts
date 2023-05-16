import { FacetConstraintMap, AppData, UniqueTags } from "../types/interfaces";

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
    const data = await response.json();
    return preprocessData(data);
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
 * remove duplicates from item tags
 * @param data
 */
export const preprocessData = (data: AppData): AppData => {
  data.data.data.forEach((item) => {
    item.tags = Array.from(new Set(item.tags));
  });
  return data;
};
