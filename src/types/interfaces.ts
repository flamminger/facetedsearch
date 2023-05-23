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

export interface IIndex {
  [key: string]: string[];
}

interface IGui {
  appTitle: string;
}

export interface IAppData {
  gui: IGui;
  data: {
    facetConstraintMap: IIndex;
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

export interface ITagOccurrence {
  [tag: string]: number;
}

export interface IErrorMessage {
  occurred: boolean;
  message: string;
}
