import React, { useEffect } from "react";
import "./App.css";
import { JsonData } from "./types/interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import { getJson } from "./helpers/api-util";
import { Container } from "reactstrap";
import ResultList from "./components/ResultList";

function App() {
  const [data, setData] = React.useState<JsonData>();

  useEffect(() => {
    const response = async () => {
      const data = await getJson("api/rta.json");
      if (data) {
        setData(data);
      }
    };
    response();
  }, []);
  return <Container>{data && <ResultList data={data?.data.data} />}</Container>;
}

export default App;
