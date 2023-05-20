import { IAppData, IFacetConstraintMap, IUniqueTags } from "../types/interfaces";

/**
 * gets facets from FacetConstraintMap
 * @param data object from input Json
 */
export const getFacets = (data: IAppData): IUniqueTags => {
  const faceConstrainMap: IFacetConstraintMap = data.data.facetConstraintMap;
  const facets: IUniqueTags = {};
  for (const [key, value] of Object.entries(faceConstrainMap)) {
    facets[key] = Array.from(new Set(value));
  }
  return facets;
};

/**
 * remove duplicates from item tags
 * @param data
 */
export const preprocessData = (data: IAppData): IAppData => {
  data.data.data.forEach((item) => {
    item.tags = Array.from(new Set(item.tags));
  });
  return data;
};
