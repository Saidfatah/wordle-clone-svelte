<script>
  import { wordsStore } from "./stores.js";
  import colors from "./colors.js";
  export let cell;
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

  function getCellWrapperStyles() {
    let bgColor;
    if (cell.score == "EMPTY") bgColor = colors.normal_cell_bg;
    if (cell.score == "WRONG_INDEX") bgColor = colors.wrong_cell_bg;
    if (cell.score == "WRONG") bgColor = colors.wrong_cell_bg;
    if (cell.score == "CORRECT") bgColor = colors.correct_cell_bg;

    return "background:" + bgColor + ";";
  }
  const getCellContentStyles = () => "color:" + colors.text_color + ";";
</script>


<style>
  .box {
    width: 50px;
    height: 50px;
    margin: 2px;
    display: flex;

    justify-content: center;
    align-items: center;
    font-family: "Koulen", cursive;
    border: 2px solid grey;
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

<div 
styles=getCellWrapperStyles()
bind:this={cellRef} 
class="animationContainer" > 
   <div  style=getCellContentStyles()  class="box">{cell.value}</div>
</div>
