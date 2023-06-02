import { IAppData, IIndex, IUniqueTags } from "../types/interfaces";

/**
 * gets facets from FacetConstraintMap
 * @param data object from input Json
 */
export const getFacets = (data: IAppData): IUniqueTags => {
  const faceConstrainMap: IIndex = data.data.facetConstraintMap;
  const facets: IUniqueTags = {};
  for (const [key, value] of Object.entries(faceConstrainMap)) {
    facets[key] = Array.from(new Set(value));
  }
  return facets;
};
