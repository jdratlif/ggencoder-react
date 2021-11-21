import { useContext } from "react";
import { ButtonGroup, Button } from "react-bootstrap";

import { Actions, Systems } from "../types";
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
    <nav>
      <ButtonGroup>
        {systems.map((system) => (
          <Button
            key={system.id}
            variant={system.id === state.system ? "success" : "primary"}
            onClick={() => onSystemChange(system.id)}
          >
            {system.name}
          </Button>
        ))}
      </ButtonGroup>
    </nav>
  );
};

export default SystemSelector;
