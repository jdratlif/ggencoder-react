import { useContext } from "react";
import { Button, Row, Col } from "react-bootstrap";

import { Actions, Systems } from "../util/types";
import StateContext from "./StateContext";

const systems = [
  {
    id: Systems.NES,
    name: "Nintendo",
  },
  {
    id: Systems.SNES,
    name: "Super Nintendo",
  },
  {
    id: Systems.GENESIS,
    name: "Sega Genesis",
  },
  {
    id: Systems.GBGG,
    name: "Game Boy & Game Gear",
  },
];

const SystemSelector = () => {
  const { state, dispatch } = useContext(StateContext);

  const onSystemChange = (system: Systems) => {
    dispatch({ type: Actions.SetSystem, payload: system });
  };

  return (
    <nav className="my-3">
      <Row className="gx-0">
        {systems.map((system) => (
          <Col xs={12} md={6} lg={3} key={system.id}>
            <div className="d-grid">
              <Button
                variant={system.id === state.system ? "success" : "primary"}
                onClick={() => onSystemChange(system.id)}
                className="rounded-0 shadow-none"
              >
                {system.name}
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </nav>
  );
};

export default SystemSelector;
