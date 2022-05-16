import React from "react";
import { Container } from "react-bootstrap";
import Plot from "react-plotly.js";

const Graph = ({ img, xaxis, yaxis }) => {
  let title = xaxis + " Vs " + yaxis;
  console.log(img);
  let keys = null;
  if (img) {
    keys = Object.keys(img);
  }
  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {img && keys && (
          <Plot
            data={[
              {
                x: img[keys[0]][xaxis],
                y: img[keys[0]][yaxis],
                name: keys[0],
                type: "scatter",
                mode: "lines",
              },
              {
                x: img[keys[1]][xaxis],
                y: img[keys[1]][yaxis],
                name: keys[1],
                type: "scatter",
                mode: "lines",
              },
            ]}
            layout={{
              // title: "Speed Vs Time ",
              title: title,
              width: 900,
              autosize: true,
              // xaxis: { title: "Time [s]" },
              xaxis: { title: xaxis },
              // yaxis: { title: "Speed [kph]" },
              yaxis: { title: yaxis },
            }}
          />
        )}
      </div>
    </Container>
  );
};

export default Graph;
