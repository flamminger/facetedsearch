import React, { useEffect } from "react";
import "./App.css";
import { JsonData } from "./types/interfaces";
import "bootstrap/dist/css/bootstrap.min.css";
import {getFacets, getJson, getTags} from "./helpers/api-util";
import { Container } from "reactstrap";
import ItemTable from "./components/table/ItemTable";
import Facet from "./components/facet/Facet";


function App() {
  const [data, setData] = React.useState<JsonData>();

  useEffect(() => {
    const response = async () => {
      const data = await getJson("api/rta.json");
      if (data) {
        setData(data);
        getFacets(data);
        console.log("beforeTags")
        getTags(data);
      }
    };
    response();

  }, []);
  return (
    <>
      <Container className="p-5">
        {data && <ItemTable data={data.data.data} />}
      </Container>
      <Container>
        {data && <Facet data={data} facetConstraintMap={data.data.facetConstraintMap}></Facet> }
      </Container>
    </>
  );
}

export default App;
