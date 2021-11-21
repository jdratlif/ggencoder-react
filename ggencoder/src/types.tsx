export enum Actions {
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
}

export type ActionType = ActionSetSystem;

export interface ActionSetSystem {
  type: Actions.SetSystem;
  payload: Systems;
}
