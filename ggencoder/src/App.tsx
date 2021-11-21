import { useReducer } from "react";

import { Actions, ActionType, StateType } from "./types";

import Footer from "./components/Footer";
import Header from "./components/Header";
import SystemSelector from "./components/SystemSelector";
import StateContext, { initialState } from "./components/StateContext";

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case Actions.SetSystem:
      return {
        ...state,
        system: action.payload,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Header version="0.0.1" />
      <SystemSelector />
      <Footer />
    </StateContext.Provider>
  );
};

export default App;
