<script>
  import Button from "./Button.svelte";
  import Toast from "./Toast.svelte";
  import Keyboard from "./Keyboard.svelte";
  import colors from "./colors.js";

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
    activeCellIndex = value;
  });

  wordsStore.subscribeToRows(value => {
    _rows = value;
  });

  const getMainStyles = () => `background:${colors.app_background_color};`;
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
    padding: 1rem;
    width: 100vw;
    height: 100vh;
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
       // increm
       // 
       wordsStore.updateActiveCellValue(key)
    }
    if(isBackSpace && !validCHarCode && activeCellIndex >= 0 && activeRowIndex < 5 ){
       // backspace
       wordsStore.backToPreviousCell() 
    }
    if ( isEnter )  wordsStore.submitRowAsnwer()  
    

}}/>

<main style={getMainStyles()} >
 
 <div class="center" >
 <div>
   {#each _rows as row,rowIndex}
       <div class="row"  >
          {#each Object.values(row) as cell}
            <svelte:component this={Cell} {...{cell,isCurrentRow:rowIndex == activeRowIndex}}/>
        	{/each}
       </div>
	{/each}
 </div>
 </div>
  <Keyboard />
  <Toast />
</main>