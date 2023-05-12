import {
  Data,
  FacetConstraintMap,
  JsonData,
  TagSet,
} from "../types/interfaces";

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
  let facets: TagSet = {};
  for (const key in faceConstrainMap) {
    let currentKey = key;
    let currentArray = faceConstrainMap[key];
    let items = new Set(currentArray);
    let itemsArray = Array.from(items);
    if (!facets[currentKey] || facets[currentKey]) {
      facets[currentKey] = itemsArray;
    }
  }
  return facets;
};

/**
 * gets tags from data
 * @param data
 */
export const getTags = (data: JsonData) => {
  const entries = data.data.data;
  let tagPairs = [];
  let tags: TagSet = {};
  for (const entry of entries) {
    if (entry.value && entry.tags) {
      tags[entry.value] = Array.from(new Set(entry.tags));
      tagPairs.push(tags);
    }
  }
  return tagPairs;
};
