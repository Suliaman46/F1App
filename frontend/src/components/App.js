import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import InitForm from "./InitForm";
import Graph from "./Graph";
const App = () => {
  console.log("rerenderd");
  const [imgData, setImgData] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  console.log(imgData);

  const submitHandler = (data) => {
    setShowSpinner(false);
    const keys = Object.keys(data);
    setImgData({
      [keys[0]]: {
        // time: JSON.parse(data[keys[0]].time),
        speed: JSON.parse(data[keys[0]].speed),
        distance: JSON.parse(data[keys[0]].distance),
        rpm: JSON.parse(data[keys[0]].rpm),
        thorttle: JSON.parse(data[keys[0]].throttle),
        brake: JSON.parse(data[keys[0]].brake),
      },
      [keys[1]]: {
        // time: JSON.parse(data[keys[1]].time),
        speed: JSON.parse(data[keys[1]].speed),
        distance: JSON.parse(data[keys[1]].distance),
        rpm: JSON.parse(data[keys[1]].rpm),
        thorttle: JSON.parse(data[keys[1]].throttle),
        brake: JSON.parse(data[keys[1]].brake),
      },
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
      {showSpinner ? (
        spin
      ) : (
        <Container>
          <Graph img={imgData} xaxis={"distance"} yaxis={"speed"} />
          <Graph img={imgData} xaxis={"distance"} yaxis={"rpm"} />
          <Graph img={imgData} xaxis={"distance"} yaxis={"thorttle"} />
          <Graph img={imgData} xaxis={"distance"} yaxis={"brake"} />
        </Container>
      )}
    </Container>
  );
};

export default App;
