// globally used interfaces
export interface IDateRange {
  startDate: string;
  endDate: string;
}

export interface IData {
  txt: string;
  value: string;
  date: IDateRange;
  tags: string[];
}

export interface IFacetConstraintMap extends IIndex {
  Ort: string[];
  Gruppe: string[];
  "Diplomatische Form": string[];
  Textsorte: string[];
  Person: string[];
  Sachbegriffe: string[];
  Ressourcentyp: string[];
}

interface IIndex {
  [key: string]: string[];
}

interface IGui {
  appTitle: string;
}

export interface IAppData {
  gui: IGui;
  data: {
    facetConstraintMap: IFacetConstraintMap;
    data: IData[];
  };
}

export interface IUniqueTags {
  [key: string]: string[];
}

export interface IOccurrence {
  key: string;
  value: number;
}

export interface IDomainOccurrence {
  [key: string]: IOccurrence[];
}

export interface IRecord {
  [key: string]: number;
}
