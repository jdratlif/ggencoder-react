import { Form, Row, Col } from "react-bootstrap";

const MainForm = () => {
  return (
    <main>
      <Form>
        <Row>
          <Col xs={12} md={3}>
            <Form.Control id="inputValue" placeholder="value" />
            <Form.Label htmlFor="inputValue">Value</Form.Label>
          </Col>
          <Col xs={12} md={6}>
            <Form.Control id="inputAddress" placeholder="address" />
            <Form.Label htmlFor="inputAddress">Address</Form.Label>
          </Col>
          <Col xs={12} md={3}>
            <Form.Control id="inputConfirm" placeholder="confirm" />
            <Form.Label htmlFor="inputConfirm">Confirm</Form.Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control id="inputCode" placeholder="Game Genie Code" />
            <Form.Label htmlFor="inputCode">Game Genie Code</Form.Label>
          </Col>
        </Row>
      </Form>
    </main>
  );
};

export default MainForm;
