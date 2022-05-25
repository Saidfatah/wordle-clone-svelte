<script>
  import { get } from "svelte/store";
  import { wordsStore } from "./stores.js";
  import { colorsThemeSTore, defaultColorTheme } from "./colorsStore.js";
  export let cell;
  export let isCurrentRow;

  let cellRef;
  let _wordIsValid;
  let colors = defaultColorTheme;
  let cellStyles = getCellWrapperStyles(cell.score, defaultColorTheme);

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
    console.log(cell.score);
    cellStyles = getCellWrapperStyles(cell.score, colors);
  }

  colorsThemeSTore.subscribeToThemeColors(value => {
    console.log(value.app_background_color);
    cellStyles = getCellWrapperStyles(cell.score, value);
    colors = value;
  });

  function getCellWrapperStyles(score, colorsTheme) {
    if (!colorsTheme) colorsTheme = defaultColorTheme;
    let bgColor;
    if (score == "EMPTY") bgColor = colorsTheme.normal_cell_bg;
    if (score == "WRONG_INDEX") bgColor = colorsTheme.wrong_index_cell_bg;
    if (score == "WRONG") bgColor = colorsTheme.wrong_cell_bg;
    if (score == "CORRECT") bgColor = colorsTheme.correct_cell_bg;
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
