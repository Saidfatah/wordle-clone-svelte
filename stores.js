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

  const checkRowResult = (rowIndex) => {
    const enteredWordCharacters = Object.values(rows[rowIndex])
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
