import React from "react";
import { Container } from "react-bootstrap";
import Plot from "react-plotly.js";

const Graph = ({ img }) => {
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
                x: img[keys[0]].time,
                y: img[keys[0]].speed,
                name: keys[0],
                type: "scatter",
                mode: "lines",
              },
              {
                x: img[keys[1]].time,
                y: img[keys[1]].speed,
                name: keys[1],
                type: "scatter",
                mode: "lines",
              },
            ]}
            layout={{
              title: "Speed Vs Time ",
              width: 900,
              autosize: true,
              xaxis: { title: "Time [s]" },
              yaxis: { title: "Speed [kph]" },
            }}
          />
        )}
      </div>
    </Container>
  );
};

export default Graph;
