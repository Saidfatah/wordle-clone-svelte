<script>
  import Button from "./Button.svelte";
  import words from "./words";

  let activeRowIndex = 0;
  let activeCharIndex = 0;
  let rows = [
    generateRow(),
    generateRow(),
    generateRow(),
    generateRow(),
    generateRow()
  ];
  const todaysWord = getTodaysWord();
  const todaysWordSplit = todaysWord.split("").reduce((a, c, i) => [...a, c], []);

  function generateRow() {
    return {
      0: {
        score: "EMPTY",
        value: ""
      },
      1: {
        score: "EMPTY",
        value: ""
      },
      2: {
        score: "EMPTY",
        value: ""
      },
      3: {
        score: "EMPTY",
        value: ""
      },
      4: {
        score: "EMPTY",
        value: ""
      }
    };
  }
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
  function validateWord(word, field, value) {
    // check if the entered entry is an actual word
    const isValid = words.hasOwnProperty(word);
    console.log({ isValid });
    return isValid;
  }

  function getTodaysWord() {
    var wordValues = Object.keys(words);
    //I'm using Left shift (<<) here because its cool
    const randomWord = wordValues[(wordValues.length * Math.random()) << 0];
    console.log({ randomWord });
    // test commiting from codesandbox
    return randomWord;
  }

  function getCellClass(score) {
    if (score == "EMPTY") return "box empty";
    if (score == "WRONG_INDEX") return "box wrong-index";
    if (score == "WRONG") return "box wrong";
    if (score == "CORRECT") return "box correct";
    return "input";
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
</style>

<svelte:window on:keydown={(event)=>{
  	const keyCode = event.keyCode;
  	const key = event.key;
    const tempRows = [...rows]
    
    let validCHarCode = (keyCode > 64 && keyCode < 91)
    const isBackSpace = keyCode == 8
    const isEnter = keyCode == 13

    if(validCHarCode && !isBackSpace && activeCharIndex < 5 && activeRowIndex < 5 ){
       // next cell 
       tempRows[activeRowIndex][activeCharIndex].value=key
       if(activeCharIndex < 4 )activeCharIndex =activeCharIndex + 1 
       

    }
    if(isBackSpace && !validCHarCode && activeCharIndex >= 0 && activeRowIndex < 5 ){
       // backspace
       tempRows[activeRowIndex][activeCharIndex].value=""
       activeCharIndex =activeCharIndex === 0 ? 0: activeCharIndex - 1 
    }
     if ( isEnter && activeRowIndex < 5 && activeCharIndex > 3 && tempRows[activeRowIndex][4].value !== ""){
       //check if word is correct 
       // here we are sending tempRows[activeRowIndex] as a ref 
          const words = Object.values(tempRows[activeRowIndex])
      .map(row => row.value)
      .join("");

       if(validateWord(words))
       checkRowResult(tempRows[activeRowIndex])
       console.log(tempRows.length)
       //reset cell index by setting state variable activeCharIndex
       activeCharIndex = 0 

       // next line 
       // by setting state variable activeCharIndex
       activeRowIndex =activeRowIndex + 1 
    }

    // set the rows state
    rows = tempRows
 
}}/>

<main>
  {#each rows as row}
  <div class="row"  >
  {#each Object.values(row) as cell}
	         <div class={getCellClass(cell.score)}>{cell.value}</div>
	{/each}
  </div>
   
	{/each}
</main>