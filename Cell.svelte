<script>
  import { wordsStore } from "./stores.js";
  export let cell;
  export let cellIndex;
  export let isCurrentRow;

  let cellRef;
  let _wordIsValid;

  const unsubscribeWordIsValid = wordsStore.subscribeToWordIsValid(value => {
    _wordIsValid = value;
  });

  $: if (!_wordIsValid) {
    if (cellRef && isCurrentRow) {
      cellRef.classList.add("wiggle");
      setTimeout(() => {
        cellRef.classList.remove("wiggle");
        // reset row state
        wordsStore.updateWordIsValid(true);
      }, 1000);
    }
  }

  function getCellText() {
    switch (cellIndex) {
      case 0:
        return "W";
        break;
      case 1:
        return "R";
        break;
      case 2:
        return "O";
        break;
      case 3:
        return "N";
        break;
      case 4:
        return "G";
        break;
      default:
        return "";
        break;
    }
  }

  function getCellClass(score) {
    if (score == "EMPTY") return "box empty";
    if (score == "WRONG_INDEX") return "box wrong-index";
    if (score == "WRONG") return "box wrong";
    if (score == "CORRECT") return "box correct";
    return "input";
  }
</script>


<style>
								.box {
								  width: 50px;
								  height: 50px;
								  margin: 2px;
								  display: flex;

								  justify-content: center;
								  align-items: center;
								  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
								    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
								}
								.empty {
								  border: 2px solid grey;
								}
								.wrong {
								  background: grey;
								}
								.wrong-index {
								  background: yellow;
								}
								.correct {
								  background: green;
								}

								.animationContainer {
								  display: inline-block;
								}
								@keyframes wiggle {
								  0% {
								    transform: rotate(0deg);
								  }
								  25% {
								    transform: rotate(5deg);
								  }
								  50% {
								    transform: rotate(0eg);
								  }
								  75% {
								    transform: rotate(-5deg);
								  }
								  100% {
								    transform: rotate(0deg);
								  }
								}

								.wiggle {
								  animation-name: wiggle;
								  animation-play-state: running;
								  animation-duration: 0.5s;
								}
</style>

<div bind:this={cellRef} class="animationContainer" > 
   <div class={getCellClass(cell.score)}>{cell.value}</div>
</div>
