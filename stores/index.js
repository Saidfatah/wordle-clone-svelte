import _wordsStore from "./wordsStore/wordsStore";
import _notificationsStore from "./notifications";
import _colorsStore, { defaultColorTheme } from "./theme";

export const wordsStore = _wordsStore;
export const notificationsStore = _notificationsStore;
export const themeStore = _colorsStore;
export const defaultTheme = defaultColorTheme;
