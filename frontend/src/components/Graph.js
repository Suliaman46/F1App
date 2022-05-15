import React from "react";
import { Container } from "react-bootstrap";
import Plot from "react-plotly.js";

const Graph = (props) => {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.img && (
          <Plot
            data={[
              {
                x: props.img.time,
                y: props.img.speed,
                type: "scatter",
                xlabel: "speed",
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
