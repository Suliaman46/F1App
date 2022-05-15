import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import InitForm from "./InitForm";
import Graph from "./Graph";
const App = () => {
  console.log("rerenderd");

  const [imgData, setImgData] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);

  const submitHandler = (img) => {
    setShowSpinner(false);
    setImgData({
      time: JSON.parse(img.time),
      speed: JSON.parse(img.speed),
    });
  };

  const showSpinnerHandler = () => {
    setShowSpinner(true);
  };

  const spin = (
    <div className="d-flex justify-content-center">
      <Spinner
        animation="border"
        role="status"
        style={{ width: "5rem", height: "5rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  return (
    <Container>
      <InitForm
        submitHandler={submitHandler}
        spinnerHandler={showSpinnerHandler}
      />
      {showSpinner ? spin : <Graph img={imgData} />}
    </Container>
  );
};

export default App;
