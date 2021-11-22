import { useContext } from "react";

// types
import { Systems } from "../types";

// components
import { Form, Row, Col } from "react-bootstrap";
import StateContext from "./StateContext";

const MainForm = () => {
  const { state, dispatch } = useContext(StateContext);

  return (
    <main className="text-center mt-4">
      <Form>
        <Row className="justify-content-center">
          <Col xs={8} md={3} lg={2}>
            <Form.Control id="inputValue" />
            <Form.Label htmlFor="inputValue">Value</Form.Label>
          </Col>

          <Col xs={8} md={6} lg={4}>
            <Form.Control id="inputAddress" />
            <Form.Label htmlFor="inputAddress">Address</Form.Label>
          </Col>

          <Col xs={8} md={3} lg={2}>
            <Form.Control
              id="inputConfirm"
              disabled={
                state.system == Systems.SNES || state.system == Systems.GENESIS
              }
            />
            <Form.Label htmlFor="inputConfirm">Confirm</Form.Label>
          </Col>
        </Row>

        <Row className="mt-3 justify-content-center">
          <Col xs={8} md={6} lg={4}>
            <Form.Control id="inputCode" />
            <Form.Label htmlFor="inputCode">Game Genie Code</Form.Label>
          </Col>
        </Row>
      </Form>
    </main>
  );
};

export default MainForm;
