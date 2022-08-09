<script>
  import { get } from "svelte/store";
  import { wordsStore, themeStore, defaultTheme } from "../stores";
  export let cell;
  export let isCurrentRow;

  let cellRef;
  let _wordIsValid;
  let colors = defaultTheme;
  let border = "2px solid gray";
  let cellStyles = getCellWrapperStyles(cell.score, defaultTheme);

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
    cellStyles = getCellWrapperStyles(cell.score, colors);
  }

  themeStore.subscribeToThemeColors(value => {
    cellStyles = getCellWrapperStyles(cell.score, value);
    colors = value;
  });

  function getCellWrapperStyles(score, colorsTheme) {
    if (!colorsTheme) colorsTheme = defaultTheme;
    let bgColor;
    if (score == "EMPTY") bgColor = colorsTheme.normal_cell_bg;
    else {
      border = "none";
    }
    if (score == "WRONG_INDEX") {
      bgColor = colorsTheme.wrong_index_cell_bg;
      //border = "2px solid " + colorsTheme.wrong_index_cell_bg;
    }
    if (score == "WRONG") {
      bgColor = colorsTheme.wrong_cell_bg;
      //border = "2px solid " + colorsTheme.wrong_cell_bg;
    }
    if (score == "CORRECT") {
      bgColor = colorsTheme.correct_cell_bg;
      //border = "2px solid " + colorsTheme.correct_cell_bg;
    }
    return `background:${bgColor};border:none`;
  }
</script>

<!-- I used global here because svelte removes unused classes 
https://stackoverflow.com/questions/62698421/svelte-adding-a-class-to-a-div-doesnt-add-the-classes-css-to-div -->
<style>
  .box {
    margin: 2px;
    justify-content: center;
    align-items: center;
    font-family: "Koulen", cursive;
    border: 2px solid grey;
    width: 100%;
    height: 100%;
    display: inline-flex;
    font-size: 2rem;
    line-height: 2rem;
    font-weight: bold;
    vertical-align: middle;
    box-sizing: border-box;
    text-transform: uppercase;
  }

  .cell {
    display: block;
    animation-delay: 0ms;
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

<div style={cellStyles}  bind:this={cellRef} class="cell" > 
   <div class="box"  style={`color:${colors.text_color};border:${border};`}  >{cell.value}</div>
</div>
