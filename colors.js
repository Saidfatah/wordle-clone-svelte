import { themeStore, themeValues } from "./stores";

const black = "#121214";
const white = "#fff";
const green = "green";
const red = "red";
const yellow = "rellow";

const light = {
  button_bg: "#d3d6da",
  active_cell_border: "#d3d6da",
  cell_border: "#3a3a3c",
  text_color: black,
  icon_color: black,
  normal_cell_bg: white,
  correct_cell_bg: green,
  wrong_cell_bg: red,
  wrong_index_cell_bg: yellow,
  app_background_color: white
};
const dark = {
  button_bg: "#d3d6da",
  active_cell_border: "#d3d6da",
  cell_border: "#d3d6da",
  text_color: white,
  icon_color: white,
  normal_cell_bg: black,
  correct_cell_bg: green,
  wrong_cell_bg: red,
  wrong_index_cell_bg: yellow,
  app_background_color: black
};

let theme = themeValues.light;

themeStore.subscribeToTheme((value) => {
  console.log({ value });
  theme = value;
});
export default theme === themeValues.dark ? dark : light;
