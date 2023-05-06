import React, { useState } from "react";
import { Table } from "reactstrap";
import usePagination from "../hooks/usePagination";
import { Data } from "../types/interfaces";
import Pagination from "./Pagination";

interface Props {
  data: Data[];
  rowsPerPage: number;
}

const ResultList: React.FC<Props> = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = usePagination(data, page, rowsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <>
      <Table bordered hover responsive striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            slice.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>
                  {item.value && <a href={item.value}>{item.txt}</a>}
                  {!item.value && item.txt}
                </td>
                <td>
                  {item.date &&
                    item.date.startDate &&
                    item.date.endDate &&
                    item.date.startDate + " - " + item.date.endDate}
                  {item.date &&
                    !item.date.startDate &&
                    item.date.endDate &&
                    item.date.endDate}
                  {item.date &&
                    item.date.startDate &&
                    !item.date.endDate &&
                    item.date.startDate}
                  {item.date &&
                    !item.date.startDate &&
                    !item.date.endDate &&
                    "N/A"}
                  {!item.date && "N/A"}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination
        page={page}
        range={range}
        totalPages={Math.ceil(data.length / rowsPerPage)}
        clickHandler={handlePageChange}
      />
    </>
  );
};

export default ResultList;
