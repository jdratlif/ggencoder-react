import { useReducer } from "react";

import { Actions, ActionType, StateType } from "./types";

import Footer from "./components/Footer";
import Header from "./components/Header";
import SystemSelector from "./components/SystemSelector";
import StateContext, { initialState } from "./components/StateContext";
import MainForm from "./components/MainForm";
import { Container } from "react-bootstrap";

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case Actions.SetSystem:
      return {
        ...state,
        system: action.payload,
        value: "",
        address: "",
        confirm: "",
        code: "",
      };
    case Actions.Decode:
      return {
        ...state,
        code: action.payload,
      };
    case Actions.Encode:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Container>
        <Header version="0.0.1" />
        <SystemSelector />
        <MainForm />
        <Footer />
      </Container>
    </StateContext.Provider>
  );
};

export default App;
