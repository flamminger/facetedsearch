// globally used interfaces
export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface Data {
  txt: string;
  value: string;
  date: DateRange;
  tags: string[];
}


export interface FacetConstraintMap extends Index {
  Ort: string[];
  Gruppe: string[];
  "Diplomatische Form": string[];
  Textsorte: string[];
  Person: string[];
  Sachbegriffe: string[];
  Ressourcentyp: string[];
}

interface Index {
  [key: string]: string[];
}

interface Gui {
  appTitle: string;
}

export interface AppData {
  gui: Gui;
  data: {
    facetConstraintMap: FacetConstraintMap;
    data: Data[];
  };
}

export interface UniqueTags {
  [key: string]: string[];
}

export interface TagOccurrences {
  [key: string]: number;
}
