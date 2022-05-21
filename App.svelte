<script>
  import Button from "./Button.svelte";
  import Toast from "./Toast.svelte";
  import Keyboard from "./Keyboard.svelte";

  import { validateWord } from "./words";
  import Cell from "./Cell.svelte";
  import { wordsStore, notifications } from "./stores.js";

  let activeRowIndex = 0;
  let activeCellIndex = 0;

  let _rows;

  wordsStore.subscribeToActiveRowIndex(value => {
    activeRowIndex = value;
  });
  wordsStore.subscribeToActiveCellIndex(value => {
    console.log(value);
    activeCellIndex = value;
  });

  wordsStore.subscribeToRows(value => {
    _rows = value;
  });
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
  .row {
    display: flex;
  }
  .center {
    width: 100vw;
    display: flex;
    justify-content: center;
  }
</style>
 

<svelte:window on:keydown={(event)=>{
  	const keyCode = event.keyCode;
  	const key = event.key;
    // const tempRows = [...rows]
 
    
    let validCHarCode = (keyCode > 64 && keyCode < 91)
    const isBackSpace = keyCode == 8
    const isEnter = keyCode == 13

    if(validCHarCode && !isBackSpace && activeCellIndex < 5 && activeRowIndex < 5 ){
       // next cell 
       wordsStore.updateActiveCellValue(key)
       wordsStore.incrementCellIndex()
    }
    if(isBackSpace && !validCHarCode && activeCellIndex >= 0 && activeRowIndex < 5 ){
       // backspace
       wordsStore.updateActiveCellValue("")
       wordsStore.decrementCellIndex()
    }
    if ( isEnter && activeRowIndex < 5 && activeCellIndex > 3 && _rows[activeRowIndex][4].value !== ""){
       //check if word is correct 
       // here we are sending tempRows[activeRowIndex] as a ref 
       const word = Object.values(_rows[activeRowIndex])
      .map(row => row.value)
      .join("");
       
       const tempRows = [..._rows]
       if(validateWord(word)){
       wordsStore.checkRowResult(activeRowIndex,tempRows[activeRowIndex])
       // reset cell to 0
       wordsStore.incrementCellIndex()
       // next line 
       wordsStore.incrementRowIndex()
       }else notifications.warning('this is not an English word', 500)

    }

}}/>

<main>
 <div class="center" >
 <div>
   {#each _rows as row,rowIndex}
       <div class="row"  >
          {#each Object.values(row) as cell,cellIndex}
            <svelte:component this={Cell} {...{cell,cellIndex,isCurrentRow:rowIndex == activeRowIndex}}/>
        	{/each}
       </div>
	{/each}
 </div>
 </div>
  <Keyboard />
  <Toast />
</main>