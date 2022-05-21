import { writable } from "svelte/store";


export let wordIsValid = writable(true);

export let rows = writable([
  generateRow(),
  generateRow(),
  generateRow(),
  generateRow(),
  generateRow()
]);
 
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
