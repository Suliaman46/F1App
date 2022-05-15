import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  FormGroup,
  FormLabel,
  Row,
  Button,
} from "react-bootstrap";
import { Form as FinalForm, Field as FinalField } from "react-final-form";
import Form from "react-bootstrap/Form";

import BootSelect from "./helper/BootstrapSelect";
import flaskF1 from "../apis/flaskF1";
const sessions = ["FP1", "FP2", "FP3", "Qualifying", "Race"];

const InitForm = (props) => {
  const [eventList, setEventList] = useState([]);
  const [eventSelected, setEventSelected] = useState("");
  const [sessionSelected, setSessionSelected] = useState("FP1");
  const [driverList, setDriverList] = useState([]);

  useEffect(() => {
    const fetchEventList = async () => {
      const response = await flaskF1.get("/events", {
        params: {
          year: 2022,
        },
      });
      setEventList(response.data.events);
      setEventSelected(response.data.events[0]);
    };
    fetchEventList();
  }, []);

  useEffect(() => {
    const fetchDriverList = async () => {
      const response = await flaskF1.get("/drivers", {
        params: {
          event: eventSelected,
          year: 2022,
          session: sessionSelected,
        },
      });
      setDriverList(response.data.drivers);
    };
    if (eventSelected && sessionSelected) {
      fetchDriverList();
    }
  }, [eventSelected, sessionSelected]);

  const renderedYears = [2022].map((year) => {
    return <option key={year}>{year}</option>;
  });
  const renderedEvents = eventList.map((event) => {
    return <option key={event}>{event}</option>;
  });

  const renderSessions = sessions.map((session) => {
    return <option key={session}>{session}</option>;
  });
  const renderDrivers = driverList.map((driver) => {
    return <option key={driver}>{driver}</option>;
  });
  const onSubmit = async (values) => {
    props.spinnerHandler();
    const response = await flaskF1.get("/fastestSTGraph", {
      params: values,
    });
    props.submitHandler(response.data);
  };
  let formData = {};
  return (
    <FinalForm
      onSubmit={onSubmit}
      initialValues={formData}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col>
                <FormGroup>
                  <FormLabel className="fw-bold fs-5"> Year</FormLabel>
                  <FinalField
                    name="year"
                    component={BootSelect}
                    options={renderedYears}
                    initialValue={2022}
                    disabled={false}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel className="fw-bold fs-5"> GrandPrix</FormLabel>
                  <FinalField
                    name="event"
                    component={BootSelect}
                    options={renderedEvents}
                    initialValue={"Bahrain"}
                    disabled={false}
                    inputOnChange={(e) => {
                      setEventSelected(e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel className="fw-bold fs-5"> Session </FormLabel>
                  <FinalField
                    name="session"
                    component={BootSelect}
                    options={renderSessions}
                    initialValue={"FP1"}
                    disabled={false}
                    inputOnChange={(e) => {
                      setSessionSelected(e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <FormLabel className="fw-bold fs-5"> Driver </FormLabel>
                  <FinalField
                    name="driver"
                    component={BootSelect}
                    options={
                      driverList.length > 0 ? (
                        renderDrivers
                      ) : (
                        <option>Loading...</option>
                      )
                    }
                    initialValue={driverList[0]}
                    disabled={driverList.length > 0 ? false : true}
                    // inputOnChange={(e) => {
                    //   setDriverSelected(e.target.value);
                    // }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup style={{ paddingTop: "10px" }}>
              <Row>
                <Col>
                  <Button variant="primary" type="submit" size="lg">
                    Get Fastest Lap Telemetry
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          </Container>
        </Form>
      )}
    />
  );
};

export default InitForm;
