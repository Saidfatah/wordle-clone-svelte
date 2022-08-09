import { writable } from "svelte/store";

const black = "#121214";
export const white = "#fff";
const green = "#6aaa64";
const yellow = "#c9b458";
const gray = "#787c7e";

const light = {
  button_bg: "#d3d6da",
  active_cell_border: "#d3d6da",
  cell_border: "#3a3a3c",
  text_color: black,
  icon_color: black,
  normal_cell_bg: white,
  correct_cell_bg: green,
  wrong_cell_bg: gray,
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
  wrong_cell_bg: gray,
  wrong_index_cell_bg: yellow,
  app_background_color: black
};

export const defaultColorTheme = light;

export const themeValues = {
  dark: "DARK",
  light: "LIGHT"
};
const createThemeStore = () => {
  const themeColors = writable(defaultColorTheme);
  //  const theme = writable(themeValues.light);

  const subscribeToThemeColors = themeColors.subscribe;

  const toggleTheme = (darkModeOn) => {
    /* theme.update((themeState) =>
      darkModeOn ? themeValues.dark : themeValues.light
    ); */
    themeColors.update((themeState) =>
      darkModeOn ? { ...dark } : { ...light }
    );
  };

  return {
    // theme,
    themeColors,
    subscribeToThemeColors,
    toggleTheme
  };
};

export default createThemeStore();
