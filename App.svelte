<script>
  import Button from "./Button.svelte";
  import { todaysWord, todaysWordSplit, validateWord } from "./words";
  import Cell from "./Cell.svelte";
  import { rows } from "./stores.js";

  let activeRowIndex = 0;
  let activeCharIndex = 0;

  let _rows;

  const unsubscribeRows = rows.subscribe(value => {
    _rows = value;
  });

  function checkRowResult(row) {
    const enteredWordCharacters = Object.values(row)
      .map(row => row.value)
      .join("");

    let correctEntries = [];
    for (let i = 0; i < 5; i++) {
      if (enteredWordCharacters[i] == todaysWordSplit[i]) {
        row[i].score = "CORRECT";
      } else if (todaysWord.indexOf(enteredWordCharacters[i]) > -1) {
        const countAppearncesInAnswer =
          todaysWord.split(enteredWordCharacters[i]).length - 1;
        const countAppearncesInTry =
          enteredWordCharacters.split(enteredWordCharacters[i]).length - 1;
        // handle case for duplicate chars in answer

        // handle case for duplicate chars in enteredWordCharacters
        //incase of duplicate chars and original word
        //has only one of these chars first char takes WRONG_INDEX
        if (
          countAppearncesInTry == 1 ||
          enteredWordCharacters.indexOf(enteredWordCharacters[i]) == i
        ) {
          //handle multiple appearnces in case wehere user typed correct
          // chars but typed same char in wrong index
          //countAppearncesInTry > 1 && countAppearncesInAnswer > 1

          row[i].score = "WRONG_INDEX";
        } else row[i].score = "WRONG";
      } else {
        row[i].score = "WRONG";
      }
      row[i].value = enteredWordCharacters[i];
    }
  }
</script>

<style>
  main {
    font-family: sans-serif;
    text-align: center;
  }
  .row {
    display: flex;
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
       $rows[activeRowIndex][activeCharIndex].value=key
       if(activeCharIndex < 4 )activeCharIndex =activeCharIndex + 1 
    }
    if(isBackSpace && !validCHarCode && activeCharIndex >= 0 && activeRowIndex < 5 ){
       // backspace
       $rows[activeRowIndex][activeCharIndex].value=""
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
       checkRowResult(tempRows[activeRowIndex])
       $rows[activeRowIndex] = tempRows[activeRowIndex] 
       
       //reset cell index by setting state variable activeCharIndex
       activeCharIndex = 0 
       // next line 
       // by setting state variable activeCharIndex
       activeRowIndex =activeRowIndex + 1 
       }

    }

}}/>

<main>
  {#each _rows as row,rowIndex}
  <div class="row"  >
  {#each Object.values(row) as cell,cellIndex}
     <svelte:component this={Cell} {...{cell,cellIndex,isCurrentRow:rowIndex == activeRowIndex}}/>
	{/each}
  </div>
   
	{/each}
</main>