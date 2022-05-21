<script>
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { notifications } from "./stores.js";

  const ASCIkeys = Array.from(Array(26).keys()).map(n => n + 65);
  console.log(ASCIkeys);
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
    background: blue;
    cursor: pointer;
    border: none;
    margin: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>


<div class="keyboard">
    {#each ASCIkeys as ASCIkey }
        <button class="keyboard-key" > 
         {String.fromCharCode(ASCIkey)}
        </button>
    {/each}
</div>