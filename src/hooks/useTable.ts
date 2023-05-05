import { useEffect, useState } from "react";
import { Data } from "../types/interfaces";

const itemRange = (data: Data[], rowsPerPage: number): number[] => {
  const range: number[] = [];
  const num = Math.ceil(data.length / rowsPerPage);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceItems = (
  data: Data[],
  page: number,
  rowsPerPage: number
): Data[] => {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return data.slice(start, end);
};

const useTable = (data: Data[], page: number, rowsPerPage: number) => {
  const [tableRange, setTableRange] = useState<number[]>([]);
  const [slice, setSlice] = useState<Data[]>([]);

  useEffect(() => {
    const range = itemRange(data, rowsPerPage);
    setTableRange(range);
    const slice = sliceItems(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, page, rowsPerPage]);

  return { slice, range: tableRange };
};
export default useTable;
