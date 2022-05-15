import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import InitForm from "./InitForm";
import Graph from "./Graph";
const App = () => {
  const [imgData, setImgData] = useState(null);

  const submitHandler = (img) => {
    setImgData({
      time: JSON.parse(img.time),
      speed: JSON.parse(img.speed),
    });
  };
  return (
    <Container>
      <InitForm submitHandler={submitHandler} />
      <Graph img={imgData} />
    </Container>
  );
};

export default App;
