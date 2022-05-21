<script>
  import { wordsStore } from "./stores";
  import colors from "./colors.js";

  const ASCIkeys = Array.from(Array(26).keys()).map(n => n + 65);
  ASCIkeys.push(10); // enter key
  ASCIkeys.push(8); // backspace

  const getKeyBoardKeyStyles = () =>
    "color:" + colors.text_color + ";background:" + colors.button_bg + ";";
</script>



<style>
  .keyboard {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
  }
  .keyboard-key {
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: none;
    margin: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Koulen", cursive;
  }
  .none-char {
    width: fit-content !important;
  }
</style>


<div class="keyboard">
    {#each ASCIkeys as ASCIkey }
        {#if ASCIkey > 10}
	 <button style=getKeyBoardKeyStyles() on:click={e=>wordsStore.updateActiveCellValue(String.fromCharCode(ASCIkey))} class="keyboard-key" > 
         {String.fromCharCode(ASCIkey)}
        </button>
{:else if ASCIkey === 8}
	 <button style=getKeyBoardKeyStyles() on:click={e=>wordsStore.updateActiveCellValue(String.fromCharCode(ASCIkey))} class="none-char keyboard-key " > 
         Enter
        </button>
{:else}
		 <button style=getKeyBoardKeyStyles() on:click={e=>wordsStore.updateActiveCellValue(String.fromCharCode(ASCIkey))} class="none-char keyboard-key " > 
        BackSPace
        </button>
{/if}
    {/each}
</div>