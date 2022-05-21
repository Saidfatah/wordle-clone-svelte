import { writable, derived } from "svelte/store";
import { todaysWord, todaysWordSplit } from "./words";

function generateRow() {
  return {
    0: {
      score: "EMPTY",
      value: ""
    },
    1: {
      score: "EMPTY",
      value: ""
    },
    2: {
      score: "EMPTY",
      value: ""
    },
    3: {
      score: "EMPTY",
      value: ""
    },
    4: {
      score: "EMPTY",
      value: ""
    }
  };
}

const createWordsStore = () => {
  const wordIsValid = writable(true);
  const rows = writable([
    generateRow(),
    generateRow(),
    generateRow(),
    generateRow(),
    generateRow()
  ]);

  const updateRow = (rowIndex, rowValue) => {
    rows.update((state) => {
      const tempRows = [...state];
      tempRows[rowIndex] = rowValue;
      return tempRows;
    });
  };
  const updateCell = (rowIndex, cellIndex, cellValue) => {
    rows.update((state) => {
      const tempRows = [...state];
      tempRows[rowIndex][cellIndex].value = cellValue;
      return tempRows;
    });
  };
  const updateCellScore = (rowIndex, cellIndex, cellScore) => {
    rows.update((state) => {
      const tempRows = [...state];
      tempRows[rowIndex][cellIndex].score = cellScore;
      return tempRows;
    });
  };
  const updateWordIsValid = (isValid) => {
    wordIsValid.set(isValid);
  };

  const checkRowResult = (rowIndex, targetRow) => {
    const enteredWordCharacters = Object.values(targetRow)
      .map((row) => row.value)
      .join("");

    for (let i = 0; i < 5; i++) {
      if (enteredWordCharacters[i] === todaysWordSplit[i]) {
        updateCellScore(rowIndex, i, "CORRECT");
      } else if (todaysWord.indexOf(enteredWordCharacters[i]) > -1) {
        const countAppearncesInTry =
          enteredWordCharacters.split(enteredWordCharacters[i]).length - 1;
        // handle case for duplicate chars in answer

        // handle case for duplicate chars in enteredWordCharacters
        //incase of duplicate chars and original word
        //has only one of these chars first char takes WRONG_INDEX
        if (
          countAppearncesInTry === 1 ||
          enteredWordCharacters.indexOf(enteredWordCharacters[i]) === i
        ) {
          //handle multiple appearnces in case wehere user typed correct
          // chars but typed same char in wrong index

          updateCellScore(rowIndex, i, "WRONG_INDEX");
        } else updateCellScore(rowIndex, i, "WRONG");
      } else {
        updateCellScore(rowIndex, i, "WRONG");
      }
      updateCell(rowIndex, i, enteredWordCharacters[i]);
    }
  };

  const subscribeToRows = rows.subscribe;
  const subscribeToWordIsValid = wordIsValid.subscribe;

  return {
    updateCell,
    updateRow,
    subscribeToRows,
    subscribeToWordIsValid,
    updateWordIsValid,
    checkRowResult
  };
};

export const wordsStore = createWordsStore();

function createNotificationStore(timeout) {
  const _notifications = writable([]);

  function send(message, type = "default", timeout) {
    _notifications.update((state) => {
      return [...state, { id: id(), type, message, timeout }];
    });
  }

  const notifications = derived(_notifications, ($_notifications, set) => {
    set($_notifications);
    if ($_notifications.length > 0) {
      const timer = setTimeout(() => {
        _notifications.update((state) => {
          state.shift();
          return state;
        });
      }, $_notifications[0].timeout);
      return () => {
        clearTimeout(timer);
      };
    }
  });
  const { subscribe } = notifications;

  return {
    subscribe,
    send,
    default: (msg, timeout) => send(msg, "default", timeout),
    danger: (msg, timeout) => send(msg, "danger", timeout),
    warning: (msg, timeout) => send(msg, "warning", timeout),
    info: (msg, timeout) => send(msg, "info", timeout),
    success: (msg, timeout) => send(msg, "success", timeout)
  };
}

function id() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export const notifications = createNotificationStore();
