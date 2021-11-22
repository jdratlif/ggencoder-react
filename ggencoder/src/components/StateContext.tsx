import { createContext } from "react";
import { ActionType, StateType, Systems } from "../types";

export const initialState: StateType = {
  system: Systems.NES,
  value: "",
  address: "",
  compare: "",
  code: "",
};

const StateContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export default StateContext;
