import React, { useContext } from "react";

// types
import { Actions, Systems } from "../types";

// components
import { Form, Row, Col } from "react-bootstrap";
import StateContext from "./StateContext";

const MainForm = () => {
  const { state, dispatch } = useContext(StateContext);

  const handleDecode: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: Actions.Decode,
      payload: event.target.value,
    });
  };

  const handleEncode: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: Actions.Encode,
      payload: {
        field: event.target.name,
        value: event.target.value,
      },
    });
  };

  return (
    <main className="text-center mt-4">
      <Form>
        <Row className="justify-content-center">
          <Col xs={8} md={3} lg={2}>
            <Form.Control
              id="inputValue"
              name="value"
              value={state.value}
              onChange={handleEncode}
            />
            <Form.Label htmlFor="inputValue">Value</Form.Label>
          </Col>

          <Col xs={8} md={6} lg={4}>
            <Form.Control
              id="inputAddress"
              name="address"
              value={state.address}
              onChange={handleEncode}
            />
            <Form.Label htmlFor="inputAddress">Address</Form.Label>
          </Col>

          <Col xs={8} md={3} lg={2}>
            <Form.Control
              id="inputConfirm"
              name="compare"
              disabled={
                state.system === Systems.SNES ||
                state.system === Systems.GENESIS
              }
              value={state.compare}
              onChange={handleEncode}
            />
            <Form.Label htmlFor="inputConfirm">Confirm</Form.Label>
          </Col>
        </Row>

        <Row className="mt-3 justify-content-center">
          <Col xs={8} md={6} lg={4}>
            <Form.Control
              id="inputCode"
              name="code"
              value={state.code}
              onChange={handleDecode}
            />
            <Form.Label htmlFor="inputCode">Game Genie Code</Form.Label>
          </Col>
        </Row>
      </Form>
    </main>
  );
};

export default MainForm;
