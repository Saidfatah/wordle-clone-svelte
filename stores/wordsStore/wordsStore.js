import { writable, get } from "svelte/store";
import { todaysWord, todaysWordCharacters, validateWord } from "./utils";
import { notificationsStore as notifications } from "../index";
// TODO
// extract activeRowIndex and activeCellIndex
// into their own store
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
  const activeRowIndex = writable(0);
  const activeCellIndex = writable(0);

  const rows = writable([
    generateRow(),
    generateRow(),
    generateRow(),
    generateRow(),
    generateRow()
  ]);

  const updateActiveCellField = (field, value) => {
    // field could be "score" or "value"
    rows.update((state) => {
      const tempRows = [...state];
      tempRows[get(activeRowIndex)][get(activeCellIndex)][field] = value;
      return tempRows;
    });
    incrementCellIndex();
  };
  const backToPreviousCell = () => {
    rows.update((state) => {
      const tempRows = [...state];
      tempRows[get(activeRowIndex)][get(activeCellIndex)].value = "";
      return tempRows;
    });
    decrementCellIndex();
  };

  const updateWordIsValid = (isValid) => {
    wordIsValid.set(isValid);
  };

  // here v stands for the state of the writable
  // in these two cases activeRowIndex's state
  // and activeCellIndex's state type are Numbers
  const incrementRowIndex = () =>
    activeRowIndex.update((v) => (v < 4 ? v + 1 : v));

  const resetCellIndex = () => activeCellIndex.set(0);
  const incrementCellIndex = () =>
    activeCellIndex.update((v) => (v < 4 ? v + 1 : v));

  const decrementCellIndex = () =>
    activeCellIndex.update((v) => (v === 0 ? 0 : v - 1));

  const submitRowAsnwer = () => {
    const activeRowIndexValue = get(activeRowIndex);
    const activeCellIndexValue = get(activeCellIndex);
    const _rows = get(rows);
    const activeRow = _rows[activeRowIndexValue];
    if (
      activeRowIndexValue < 5 &&
      activeCellIndexValue > 3 &&
      _rows[activeRowIndexValue][4].value !== ""
    ) {
      //check if word is correct
      // here we are sending tempRows[activeRowIndex] as a ref
      const word = Object.values(activeRow)
        .map((row) => row.value)
        .join("");

      const tempRows = [...get(rows)];
      if (validateWord(word)) {
        checkRowResult(tempRows[activeRowIndexValue]);
        // reset cell to 0
        resetCellIndex();
        // next line
        incrementRowIndex();
      } else notifications.warning("this is not an English word", 500);
    }
  };
  const checkRowResult = (targetRow) => {
    const enteredWordCharacters = Object.values(targetRow)
      .map((row) => row.value)
      .join("");

    for (let i = 0; i < 5; i++) {
      if (enteredWordCharacters[i] === todaysWordCharacters[i]) {
        updateActiveCellField("score", "CORRECT");
      } else if (todaysWord.indexOf(enteredWordCharacters[i]) > -1) {
        const characterAppearncesInTryCount =
          enteredWordCharacters.split(enteredWordCharacters[i]).length - 1;
        // handle case for duplicate chars in answer

        // handle case for duplicate chars in enteredWordCharacters
        //incase of duplicate chars and original word
        //has only one of these chars first char takes WRONG_INDEX
        if (
          characterAppearncesInTryCount === 1 ||
          enteredWordCharacters.indexOf(enteredWordCharacters[i]) === i
        ) {
          //handle multiple appearnces in case wehere user typed correct
          // chars but typed same char in wrong index

          updateActiveCellField("score", "WRONG_INDEX");
        } else updateActiveCellField("score", "WRONG");
      } else {
        // add to no in word character
        updateActiveCellField("score", "WRONG");
      }
      updateActiveCellField("value", enteredWordCharacters[i]);
    }
  };

  const subscribeToRows = rows.subscribe;
  const subscribeToActiveRowIndex = activeRowIndex.subscribe;
  const subscribeToActiveCellIndex = activeCellIndex.subscribe;
  const subscribeToWordIsValid = wordIsValid.subscribe;

  return {
    subscribeToRows,
    subscribeToWordIsValid,
    updateWordIsValid,

    subscribeToActiveRowIndex,
    incrementRowIndex,
    subscribeToActiveCellIndex,
    decrementCellIndex,
    incrementCellIndex,
    resetCellIndex,

    updateActiveCellField,
    backToPreviousCell,
    submitRowAsnwer
  };
};

// notifications store

export default createWordsStore();
