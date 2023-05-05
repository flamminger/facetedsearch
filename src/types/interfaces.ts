export interface Data {
  txt: string;
  value: string;
  date: {
    startDate: string;
    endDate: string;
  };
  tags: string[];
}

interface FacetConstraintMap {
  Ort: string[];
  Gruppe: string[];
  "Diplomatische Form": string[];
  Textsorte: string[];
  Person: string[];
  Sachbegriffe: string[];
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
