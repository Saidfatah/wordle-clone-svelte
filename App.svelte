<script>
  import Button from "./Button.svelte";
  import Toast from "./Toast.svelte";

  import { validateWord } from "./words";
  import Cell from "./Cell.svelte";
  import { wordsStore, notifications } from "./stores.js";

  let activeRowIndex = 0;
  let activeCharIndex = 0;

  let _rows;

  const unsubscribeRows = wordsStore.subscribeToRows(value => {
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
    width: 100%;
    width: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
 

<svelte:window on:keydown={(event)=>{
  	const keyCode = event.keyCode;
  	const key = event.key;
    // const tempRows = [...rows]
 
    
    let validCHarCode = (keyCode > 64 && keyCode < 91)
    const isBackSpace = keyCode == 8
    const isEnter = keyCode == 13

    if(validCHarCode && !isBackSpace && activeCharIndex < 5 && activeRowIndex < 5 ){
       // next cell 
       wordsStore.updateCell(activeRowIndex,activeCharIndex,key)
       if(activeCharIndex < 4 )activeCharIndex =activeCharIndex + 1 
    }
    if(isBackSpace && !validCHarCode && activeCharIndex >= 0 && activeRowIndex < 5 ){
       // backspace
       wordsStore.updateCell(activeRowIndex,activeCharIndex,"")
       activeCharIndex =activeCharIndex === 0 ? 0: activeCharIndex - 1 
    }
    if ( isEnter && activeRowIndex < 5 && activeCharIndex > 3 && _rows[activeRowIndex][4].value !== ""){
       //check if word is correct 
       // here we are sending tempRows[activeRowIndex] as a ref 
       const word = Object.values(_rows[activeRowIndex])
      .map(row => row.value)
      .join("");
       
       const tempRows = [..._rows]
       if(validateWord(word)){
       wordsStore.checkRowResult(activeRowIndex,tempRows[activeRowIndex])

       //reset cell index by setting state variable activeCharIndex
       activeCharIndex = 0 
       // next line 
       // by setting state variable activeCharIndex
       activeRowIndex =activeRowIndex + 1 
       }else notifications.warning('this is not an English word', 2000)

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


  <Toast />
</main>