import { useReducer } from "react";

import { Container } from "react-bootstrap";

import StateContext, { initialState } from "./components/StateContext";
import Header from "./components/Header";
import SystemSelector from "./components/SystemSelector";
import MainForm from "./components/MainForm";
import Footer from "./components/Footer";

import { reducer } from "./util/reducer";

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
