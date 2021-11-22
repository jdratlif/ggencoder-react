import { Systems } from "./types";

const hexRegex = /^[0-9a-fA-F]*$/;

export const isValidAddress = (address: string, system: Systems) => {
  if (address.length === 0) {
    return true;
  }

  if (!hexRegex.test(address)) {
    return false;
  }

  const v = parseInt(address, 16);

  if (isNaN(v)) {
    return false;
  }

  if (v < 0) {
    return false;
  }

  if (system === Systems.SNES && v > 16777215) {
    return false;
  } else if (system !== Systems.SNES && v > 65535) {
    return false;
  }

  return true;
};

export const isValidValue = (value: string, system: Systems) => {
  if (value.length === 0) {
    return true;
  }

  if (!hexRegex.test(value)) {
    return false;
  }

  const v = parseInt(value, 16);

  if (isNaN(v)) {
    return false;
  }

  if (v < 0) {
    return false;
  }

  if (system === Systems.GENESIS && v > 65535) {
    return false;
  } else if (system !== Systems.GENESIS && v > 255) {
    return false;
  }

  return true;
};
