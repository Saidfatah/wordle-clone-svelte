import _wordsStore from "./wordsStore";
import _notificationsStore from "./notificationsStore";
import _colorsStore, { defaultColorTheme } from "./colorsStore";

export const wordsStore = _wordsStore;
export const notificationsStore = _notificationsStore;
export const themeStore = _colorsStore;
export const defaultTheme = defaultColorTheme;
