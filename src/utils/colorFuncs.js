/**
 * Parses the given color to the six-space hex notation with no leading #
 * @param {string} hexColor A color in hexadecimal notation
 * @returns {string}
 * @throws Will throw an error if the given `hexColor` is not a valid color
 */
const cleanHex = (hexColor) => {
  // Remove starting # and invalid characters
  let hex = String(hexColor).replace(/[^0-9a-f]/gi, '');
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  } else if (hex.length !== 6) {
    throw new Error(`Invalid color value ${hexColor}`);
  }
  return hex;
};

/**
 * Generates a dark color from a given color
 * @param {string} hexColor A color in hexadecimal notation
 * @returns {string}
 * @throws Will throw an error if the given `hexColor` is not a valid color
 */
const getDarkerColor = (hexColor) => {
  const clean = cleanHex(hexColor);
  const rgb = [0, 1, 2].map((i) => parseInt(clean.slice(i * 2, i * 2 + 2), 16));
  const newColor = rgb.reduce((color, component) => {
    const newComponent = Math.round(component * 0.5)
      .toString(16)
      .padStart(2, '0');
    return `${color}${newComponent}`;
  }, '#');
  return newColor;
};

export default getDarkerColor;
