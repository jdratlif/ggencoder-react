import { decode, encode } from "./encdec";
import { Actions, ActionType, RawCode, StateType, Systems } from "./types";
import {
  isValidAddress,
  isValidCode,
  isValidPartialCode,
  isValidValue,
} from "./validate";

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

      if (isValidCode(code, state.system)) {
        const { value, address, compare } = decode(code, state.system);

        let padding = 2;

        if (state.system === Systems.GENESIS) {
          padding = 4;
        }

        const hexValue = value
          .toString(16)
          .padStart(padding, "0")
          .toUpperCase();

        if (state.system === Systems.SNES) {
          padding = 6;
        } else {
          padding = 4;
        }

        const hexAddress = address
          .toString(16)
          .padStart(padding, "0")
          .toUpperCase();

        let hexCompare = "";

        if (compare) {
          hexCompare = compare.toString(16).padStart(2, "0").toUpperCase();
        }

        return {
          ...state,
          code,
          value: hexValue,
          address: hexAddress,
          compare: hexCompare,
        };
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

      let v = 0,
        a = 0,
        c = 0;

      if (field === "value") {
        v = parseInt(value, 16);
      } else if (state.value.length > 0) {
        v = parseInt(state.value, 16);
      }

      if (field === "address") {
        a = parseInt(value, 16);
      } else if (state.address.length > 0) {
        a = parseInt(state.address, 16);
      }

      if (field === "compare") {
        c = parseInt(value, 16);
      } else if (state.compare.length > 0) {
        c = parseInt(state.compare, 16);
      }

      if (a > 0) {
        const rawCode: RawCode = {
          value: v,
          address: a,
          compare: c,
        };

        const code = encode(rawCode, state.system);

        return {
          ...state,
          code,
          [field]: value,
        };
      }

      return {
        ...state,
        [field]: value,
      };
    default:
      return state;
  }
};
