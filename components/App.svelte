<script>
  import Toggle from "./Toggle.svelte";
  import Toast from "./Toast.svelte";
  import Keyboard from "./Keyboard.svelte";
  import {
    wordsStore,
    notificationsStore,
    defaultTheme,
    themeStore
  } from "../stores";

  import Cell from "./Cell.svelte";

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

  let colors = defaultTheme;
  themeStore.subscribeToThemeColors(value => {
    colors = value;
  });
  $: mainStyles = `background:${colors && colors.app_background_color};`;
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
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5px;
  }
  .rows {
    width: 350px;
    height: 420px;
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 5px;
    padding: 10px;
    box-sizing: border-box;
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
       wordsStore.updateActiveCellField("value",key)
    }
    if(isBackSpace && !validCHarCode && activeCellIndex >= 0 && activeRowIndex < 5 ){
       // backspace
       wordsStore.backToPreviousCell() 
    }
    if ( isEnter )  wordsStore.submitRowAsnwer()  
    

}}/>

<main style={mainStyles} >
 <Toggle />
 <div class="center" >
 <div class="rows" >
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