import { AppData, FacetConstraintMap, UniqueTags } from "../types/interfaces";

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
