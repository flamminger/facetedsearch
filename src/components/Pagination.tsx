import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

interface Props {
  page: number;
  range: number[];
  totalPages: number;
  clickHandler: (page: number) => void;
}

const TablePagination: React.FC<Props> = ({
  page,
  range,
  totalPages,
  clickHandler,
}) => {
  const prevPage = page - 1;
  const nextPage = page + 1;

  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={page <= 1}>
        <PaginationLink previous onClick={() => clickHandler(prevPage)}>
          Previous
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={page <= 1}>
        <PaginationLink onClick={() => clickHandler(1)}>First</PaginationLink>
      </PaginationItem>
      {range.map((pageNumber, index) => {
        if (pageNumber === page) {
          return (
            <PaginationItem active key={index}>
              <PaginationLink>{pageNumber}</PaginationLink>
            </PaginationItem>
          );
        } else if (
          pageNumber <= totalPages &&
          pageNumber >= page - 2 &&
          pageNumber <= page + 2
        ) {
          return (
            <PaginationItem key={index}>
              <PaginationLink onClick={() => clickHandler(pageNumber)}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        } else {
          return null;
        }
      })}
      <PaginationItem disabled={page >= totalPages}>
        <PaginationLink onClick={() => clickHandler(totalPages)}>
          Last
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled={page >= totalPages}>
        <PaginationLink next onClick={() => clickHandler(nextPage)}>
          Next
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};

export default TablePagination;
