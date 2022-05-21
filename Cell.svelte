<script>
  import { wordIsValid } from "./stores.js";
  export let cell;
  export let isCurrentRow;

  let cellRef;
  let _wordIsValid;

  const unsubscribeWordIsValid = wordIsValid.subscribe(value => {
    _wordIsValid = value;
  });

  $: if (!_wordIsValid) {
    console.log({ _wordIsValid, isCurrentRow });
    if (cellRef && isCurrentRow) {
      console.log({ _wordIsValid });
      cellRef.classList.add("wiggle");
      setTimeout(() => {
        cellRef.classList.remove("wiggle");
        $wordIsValid = true;
      }, 500);
    }
  }
  //$: if (wordIsValid) console.log("wordIsValid");

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
				}
				.empty {
				  background: grey;
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
				  20% {
				    transform: rotate(-15deg);
				  }
				  40% {
				    transform: rotate(15deg);
				  }
				  60% {
				    transform: rotate(-7deg);
				  }
				  80% {
				    transform: rotate(7deg);
				  }
				  90% {
				    transform: rotate(-3deg);
				  }
				  95% {
				    transform: rotate(2deg);
				  }
				  100% {
				    transform: rotate(0deg);
				  }
				}

				.wiggle {
				  background: rebeccapurple;
				  animation-name: wiggle;
				  animation-play-state: running;
				}
</style>

<div bind:this={cellRef} class="animationContainer" > 
   <div class={getCellClass(cell.score)}>{cell.value}</div>
</div>
