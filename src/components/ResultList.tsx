import { PropsWithChildren } from "react";
import { Data } from "../types/interfaces";
import { Table } from "reactstrap";

const ResultList = ({ data }: PropsWithChildren<{ data: Data[] }>) => {
  return (
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
          data.map((item, index) => (
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
  );
};

export default ResultList;
