import { Systems } from "./types";

const hexRegex = /^[0-9a-fA-F]*$/;
const nesRegex = /^[APZLGITYEOXUKSVN]*$/;
const genesisRegex = /^[ABCDEFGHJKLMNPRSTVWXYZ0-9]*$/;

const partialSNESRegex = /^[0-9a-fA-F-]+$/;
const partialGenesisRegex = /^[ABCDEFGHJKLMNPRSTVWXYZ0-9-]+$/;

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

export const isValidCode = (code: string, system: Systems) => {
  if (code.length === 0) {
    return true;
  }

  if (system === Systems.NES) {
    if (code.length !== 6 && code.length !== 8) {
      return false;
    }

    if (!nesRegex.test(code)) {
      return false;
    }
  } else if (system === Systems.SNES) {
    if (code.length !== 9) {
      return false;
    }

    const segments = code.split("-");

    if (segments.length !== 2) {
      return false;
    }

    if (!segments.every(hexRegex.test)) {
      return false;
    }
  } else if (system === Systems.GENESIS) {
    if (code.length !== 9) {
      return false;
    }

    const segments = code.split("-");

    if (segments.length !== 2) {
      return false;
    }

    if (!segments.every(genesisRegex.test)) {
      return false;
    }
  } else if (system === Systems.GBGG) {
    if (code.length !== 7 && code.length !== 11) {
      return false;
    }

    const segments = code.split("-");

    if (segments.length !== 2 && segments.length !== 3) {
      return false;
    }

    if (!segments.every(hexRegex.test)) {
      return false;
    }
  }

  return true;
};

export const isValidPartialCode = (code: string, system: Systems) => {
  if (code.length === 0) {
    return true;
  }

  if (system === Systems.NES) {
    return nesRegex.test(code);
  }

  if (system === Systems.SNES || system === Systems.GBGG) {
    return partialSNESRegex.test(code);
  }

  if (system === Systems.GENESIS) {
    return partialGenesisRegex.test(code);
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
