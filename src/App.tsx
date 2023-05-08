import React, { useEffect } from "react";
import "./App.css";
import { JsonData } from "./types/interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import {getFacets, getJson} from "./helpers/api-util";
import { Container } from "reactstrap";
import ItemTable from "./components/table/ItemTable";


function App() {
  const [data, setData] = React.useState<JsonData>();

  useEffect(() => {
    const response = async () => {
      const data = await getJson("api/rta.json");
      if (data) {
        setData(data);
        getFacets(data);
      }
    };
    response();

  }, []);
  return (
    <>
      <Container className="p-5">
        {data && <ItemTable data={data.data.data} />}
      </Container>
    </>
  );
}

export default App;
