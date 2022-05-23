<script>
  import { wordsStore } from "./stores.js";
  import colors from "./colors.js";
  export let cell;
  export let isCurrentRow;

  let cellRef;
  let _wordIsValid;
  let cellStyles = getCellWrapperStyles(cell.score);

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

  $: if (cell.score) {
    cellStyles = getCellWrapperStyles(cell.score);
  }

  function getCellWrapperStyles(score) {
    let bgColor;
    if (score == "CORRECT") console.log({ score });
    if (score == "EMPTY") bgColor = colors.normal_cell_bg;
    if (score == "WRONG_INDEX") bgColor = colors.wrong_index_cell_bg;
    if (score == "WRONG") bgColor = colors.wrong_cell_bg;
    if (score == "CORRECT") bgColor = colors.correct_cell_bg;
    console.log(bgColor);
    return `background:${bgColor};border:none`;
  }
</script>

<!-- I used global here because svelte removes unused classes 
https://stackoverflow.com/questions/62698421/svelte-adding-a-class-to-a-div-doesnt-add-the-classes-css-to-div -->
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
  @keyframes wiggleAnimation {
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

  :global(.wiggle) {
    animation-name: wiggleAnimation;
    animation-play-state: running;
    animation-duration: 0.5s;
  }
</style>

<div style={cellStyles}  bind:this={cellRef} class="animationContainer" > 
   <div  style={`color:${colors.text_color};`}  class="box">{cell.value}</div>
</div>
