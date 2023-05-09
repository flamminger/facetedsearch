// globally used interfaces
export interface Data {
  txt: string;
  value: string;
  date: {
    startDate: string;
    endDate: string;
  };
  tags: string[];
}

export interface FacetConstraintMap extends Index{
  Ort: string[];
  Gruppe: string[];
  "Diplomatische Form": string[];
  Textsorte: string[];
  Person: string[];
  Sachbegriffe: string[];
}

interface Index {
    [key: string]: string[];
}

interface Gui {
  appTitle: string;
}

export interface JsonData {
  gui: Gui;
  data: {
    facetConstraintMap: FacetConstraintMap;
    data: Data[];
  };
}

export interface TagPairs {
  [key: string]: Set<string>;
}

