import { Actions, ActionType, StateType } from "./types";
import { isValidAddress, isValidPartialCode, isValidValue } from "./validate";

export const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case Actions.SetSystem:
      return {
        ...state,
        system: action.payload,
        value: "",
        address: "",
        compare: "",
        code: "",
      };
    case Actions.Decode:
      const code = action.payload.toUpperCase();

      if (!isValidPartialCode(code, state.system)) {
        return state;
      }

      return {
        ...state,
        code,
      };
    case Actions.Encode:
      let { field, value } = action.payload;

      value = value.toUpperCase();

      if (
        (field === "value" || field === "compare") &&
        !isValidValue(value, state.system)
      ) {
        return state;
      }

      if (field === "address" && !isValidAddress(value, state.system)) {
        return state;
      }

      return {
        ...state,
        [field]: value,
      };
    default:
      return state;
  }
};
