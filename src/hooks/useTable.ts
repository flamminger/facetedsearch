import { useEffect, useState } from "react";
import { Data } from "../types/interfaces";

interface PaginationInfo {
  currentPage: number;
  firstPage: number;
  lastPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pages: number[];
}

const itemRange = (data: Data[], rowsPerPage: number) => {
  const range: number[] = [];
  const num = Math.ceil(data.length / rowsPerPage);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceItems = (data: Data[], page: number, rowsPerPage: number) => {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  return data.slice(start, end);
};

const useTable = (data: Data[], page: number, rowsPerPage: number) => {
  const [tableRange, setTableRange] = useState<number[]>([]);
  const [slice, setSlice] = useState<Data[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    currentPage: 1,
    firstPage: 1,
    lastPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    pages: [1],
  });

  useEffect(() => {
    const range = itemRange(data, rowsPerPage);
    setTableRange(range);
    const slice = sliceItems(data, page, rowsPerPage);
    setSlice([...slice]);

    // calculate pagination info
    const numPages = range.length;
    const currentPage = page;
    const firstPage = 1;
    const lastPage = numPages;
    const hasNextPage = currentPage < numPages;
    const hasPreviousPage = currentPage > 1;
    const pages = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, numPages);
    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    setPaginationInfo({
      currentPage,
      firstPage,
      lastPage,
      hasNextPage,
      hasPreviousPage,
      pages,
    });
  }, [data, page, rowsPerPage]);

  return { slice, range: tableRange, paginationInfo };
};

export default useTable;
