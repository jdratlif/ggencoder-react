export enum Actions {
  Decode,
  Encode,
  SetSystem,
}

export enum Systems {
  NES = 1,
  SNES = 2,
  GENESIS = 3,
  GBGG = 4,
}

export interface StateType {
  system: Systems;
  value: string;
  address: string;
  compare: string;
  code: string;
}

export type ActionType = ActionSetSystem | ActionDecode | ActionEncode;

interface ActionSetSystem {
  type: Actions.SetSystem;
  payload: Systems;
}

interface ActionDecode {
  type: Actions.Decode;
  payload: string;
}

interface ActionEncode {
  type: Actions.Encode;
  payload: {
    field: string;
    value: string;
  };
}
