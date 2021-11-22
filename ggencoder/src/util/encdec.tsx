import { RawCode, Systems } from "./types";

// the Game Boy / Game Gear game genie alphabet
const ALPHABET_GBGG = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

// the Genesis game genie alphabet
const ALPHABET_GENESIS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "M",
  "N",
  "P",
  "R",
  "S",
  "T",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

// the NES game genie alphabet
const ALPHABET_NES = [
  "A",
  "P",
  "Z",
  "L",
  "G",
  "I",
  "T",
  "Y",
  "E",
  "O",
  "X",
  "U",
  "K",
  "S",
  "V",
  "N",
];

// the SNES game genie alphabet
const ALPHABET_SNES = [
  "D",
  "F",
  "4",
  "7",
  "0",
  "9",
  "1",
  "5",
  "6",
  "B",
  "C",
  "8",
  "A",
  "2",
  "3",
  "E",
];

export const decode = (code: string, system: Systems) => {
  switch (system) {
    case Systems.NES:
      return decodeNES(code);
    case Systems.SNES:
      return decodeSNES(code);
    case Systems.GENESIS:
      return decodeGenesis(code);
    case Systems.GBGG:
      return decodeGBGG(code);
    default:
      console.error(`Unknown system type ${system}`);
  }

  return {
    value: 0,
    address: 0,
    compare: 0,
  };
};

// decodes a game boy or game gear game genie code into a raw code
const decodeGBGG = (code: string) => {
  const rawCode: RawCode = {
    value: 0,
    address: 0,
    compare: 0,
  };

  let hex = code
    .split("")
    .filter((letter) => letter !== "-")
    .map((letter) => ALPHABET_GBGG.indexOf(letter));

  rawCode.value = (hex[0] << 4) | hex[1];
  rawCode.address =
    (hex[2] << 8) | (hex[3] << 4) | hex[4] | ((~hex[5] & 0xf) << 12);

  if (code.length === 11) {
    let temp = (hex[6] << 4) | hex[8];
    temp = (temp >> 2) | ((temp << 6) & 0xfc);
    rawCode.compare = temp ^ 0xba;
  }

  return rawCode;
};

// decodes a genesis game genie code into a raw code
const decodeGenesis = (code: string) => {
  const rawCode: RawCode = {
    value: 0,
    address: 0,
    compare: 0,
  };

  let hex = code
    .split("")
    .filter((letter) => letter !== "-")
    .map((letter) => ALPHABET_GENESIS.indexOf(letter));

  rawCode.value =
    ((hex[5] & 0x01) << 15) |
    (((hex[6] & 0x18) >> 3) << 13) |
    ((hex[4] & 0x01) << 12) |
    (((hex[5] & 0x1e) >> 1) << 8) |
    (hex[0] << 3) |
    ((hex[1] & 0x1c) >> 2);

  rawCode.address =
    hex[7] |
    ((hex[6] & 0x03) << 5) |
    (((hex[3] & 0x10) >> 4) << 8) |
    (hex[2] << 9) |
    ((hex[1] & 0x03) << 14) |
    (((hex[4] & 0x1e) >> 1) << 16) |
    ((hex[3] & 0x0f) << 20);

  return rawCode;
};

// decodes a nintendo game genie code into a raw code
const decodeNES = (code: string) => {
  const rawCode: RawCode = {
    value: 0,
    address: 0,
    compare: 0,
  };

  let bitString = 0;

  for (let i = 0; i < code.length; i++) {
    let letter = code.charAt(i);
    bitString <<= 4;
    bitString |= ALPHABET_NES.indexOf(letter);
  }

  let temp;

  if (code.length === 6) {
    bitString <<= 8;
  }

  rawCode.value = ((bitString >> 28) & 0x8) | ((bitString >> 24) & 0x7);

  if (code.length === 6) {
    temp = (bitString & 0x800) >> 8;
  } else {
    temp = bitString & 0x8;
  }

  temp |= (bitString >> 28) & 0x7;

  rawCode.value <<= 4;
  rawCode.value |= temp;

  rawCode.address = (bitString & 0x70000) >> 16;

  temp = ((bitString & 0x8000) >> 12) | ((bitString & 0x700) >> 8);
  rawCode.address <<= 4;
  rawCode.address |= temp;

  temp = ((bitString & 0x8000000) >> 24) | ((bitString & 0x700000) >> 20);
  rawCode.address <<= 4;
  rawCode.address |= temp;

  temp = ((bitString & 0x80000) >> 16) | ((bitString & 0x7000) >> 12);
  rawCode.address <<= 4;
  rawCode.address |= temp;

  if (code.length === 8) {
    rawCode.compare = ((bitString & 0x80) >> 4) | (bitString & 0x7);

    temp = ((bitString & 0x800) >> 8) | ((bitString & 0x70) >> 4);
    rawCode.compare <<= 4;
    rawCode.compare |= temp;
  }

  return rawCode;
};

// decodes a super nintendo game genie code into a raw code
const decodeSNES = (code: string) => {
  const rawCode: RawCode = {
    value: 0,
    address: 0,
    compare: 0,
  };

  let bitString = 0;

  for (let i = 0; i < code.length; i++) {
    if (i === 4) {
      continue;
    }

    let letter = code.charAt(i);
    bitString <<= 4;
    bitString |= ALPHABET_SNES.indexOf(letter);
  }

  let temp;

  rawCode.value = (bitString >> 24) & 0xff;

  rawCode.address = ((bitString >> 10) & 0xc) | ((bitString >> 10) & 0x3);

  temp = ((bitString >> 2) & 0xc) | ((bitString >> 2) & 0x3);
  rawCode.address <<= 4;
  rawCode.address |= temp;

  temp = (bitString >> 20) & 0xf;
  rawCode.address <<= 4;
  rawCode.address |= temp;

  temp = ((bitString << 2) & 0xc) | ((bitString >> 14) & 0x3);
  rawCode.address <<= 4;
  rawCode.address |= temp;

  temp = (bitString >> 16) & 0xf;
  rawCode.address <<= 4;
  rawCode.address |= temp;

  temp = ((bitString >> 6) & 0xc) | ((bitString >> 6) & 0x3);
  rawCode.address <<= 4;
  rawCode.address |= temp;

  return rawCode;
};

export const encode = (code: RawCode, system: Systems) => {
  switch (system) {
    case Systems.NES:
      return encodeNES(code);
    case Systems.SNES:
      return encodeSNES(code);
    case Systems.GENESIS:
      return encodeGenesis(code);
    case Systems.GBGG:
      return encodeGBGG(code);
    default:
      console.error(`Unknown system type ${system}`);
  }

  return "";
};

// encodes a raw code into a game boy/game gear game genie code
const encodeGBGG = ({ value, address, compare }: RawCode) => {
  let code = "";
  let temp;
  let genie = 0;

  temp = (address & 0xf000) >> 12;
  temp = ~temp & 0xf;
  temp |= (address & 0xfff) << 4;
  genie <<= 16;
  genie |= temp;

  if (compare) {
    compare ^= 0xba;
    compare = (compare << 2) | (compare >> 6);
    temp = (compare & 0xf0) >> 4;
    genie <<= 4;
    genie |= temp;

    temp ^= 8;
    genie <<= 4;
    genie |= temp;

    temp = compare & 0xf;
    genie <<= 4;
    genie |= temp;
  }

  for (let i = 0; i < (compare ? 7 : 4); i++) {
    if (i === 3 || i === 6) {
      code = "-" + code;
    }

    code = ALPHABET_GBGG[(genie >> (i * 4)) & 0xf] + code;
  }

  code = value.toString(16).padStart(2, "0") + code;

  return code;
};

// encodes a raw code into a sega genesis game genie code
const encodeGenesis = ({ value, address }: RawCode) => {
  let code = "";
  let temp;
  let genie = [0, 0];

  genie[1] = (value & 0xf0) >> 4;

  temp = value & 0xf;
  genie[1] <<= 4;
  genie[1] |= temp;

  temp = (address & 0xf000) >> 12;
  genie[1] <<= 4;
  genie[1] |= temp;

  temp = (address & 0xf00) >> 8;
  genie[1] <<= 4;
  genie[1] |= temp;

  temp = (address & 0xf00000) >> 20;
  genie[1] <<= 4;
  genie[1] |= temp;

  genie[0] = (address & 0xf0000) >> 16;

  temp = ((value & 0x1000) >> 9) | ((value & 0xe00) >> 9);
  genie[0] <<= 4;
  genie[0] |= temp;

  temp = ((value & 0x100) >> 5) | ((value & 0xe000) >> 13);
  genie[0] <<= 4;
  genie[0] |= temp;

  temp = (address & 0xf0) >> 4;
  genie[0] <<= 4;
  genie[0] |= temp;

  temp = address & 0xf;
  genie[0] <<= 4;
  genie[0] |= temp;

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 4; j++) {
      code = ALPHABET_GENESIS[(genie[i] >> (j * 5)) & 0x1f] + code;
    }

    if (i === 0) {
      code = "-" + code;
    }
  }

  return code;
};

// encodes a raw code into a nintendo game genie code
const encodeNES = ({ value, address, compare }: RawCode) => {
  let code = "";
  let genie;
  let temp;

  genie = ((value & 0x80) >> 4) | (value & 0x7);

  temp = ((address & 0x80) >> 4) | ((value & 0x70) >> 4);
  genie <<= 4;
  genie |= temp;

  temp = (address & 0x70) >> 4;

  if (compare) {
    temp |= 0x8;
  }

  genie <<= 4;
  genie |= temp;

  temp = (address & 0x8) | ((address & 0x7000) >> 12);
  genie <<= 4;
  genie |= temp;

  temp = ((address & 0x800) >> 8) | (address & 0x7);
  genie <<= 4;
  genie |= temp;

  if (compare) {
    temp = (compare & 0x8) | ((address & 0x700) >> 8);
    genie <<= 4;
    genie |= temp;

    temp = ((compare & 0x80) >> 4) | (compare & 0x7);
    genie <<= 4;
    genie |= temp;

    temp = (value & 0x8) | ((compare & 0x70) >> 4);
    genie <<= 4;
    genie |= temp;
  } else {
    temp = (value & 0x8) | ((address & 0x700) >> 8);
    genie <<= 4;
    genie |= temp;
  }

  for (let i = 0; i < (compare ? 8 : 6); i++) {
    code = ALPHABET_NES[(genie >> (i * 4)) & 0xf] + code;
  }

  return code;
};

// encodes a raw code into a super nintendo code
const encodeSNES = ({ value, address }: RawCode) => {
  let code = "";
  let genie;
  let temp;

  genie = value;

  temp = (address & 0xf000) >> 12;
  genie <<= 4;
  genie |= temp;

  temp = (address & 0xf0) >> 4;
  genie <<= 4;
  genie |= temp;

  temp = ((address & 0x300) >> 6) | (address >> 22);
  genie <<= 4;
  genie |= temp;

  temp = ((address & 0x300000) >> 18) | ((address & 0xc) >> 2);
  genie <<= 4;
  genie |= temp;

  temp = ((address & 0x3) << 2) | ((address & 0xc0000) >> 18);
  genie <<= 4;
  genie |= temp;

  temp = ((address & 0x30000) >> 14) | ((address & 0xc00) >> 10);
  genie <<= 4;
  genie |= temp;

  for (let i = 0; i < 8; i++) {
    if (i === 4) {
      code = "-" + code;
    }

    code = ALPHABET_SNES[(genie >> (i * 4)) & 0xf] + code;
  }

  return code;
};
