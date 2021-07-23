<script>
  import LoginButton from "./lib/LoginButton.svelte";
</script>

<main>
  <div class="text-4xl text-bold p-6 border-1 rounded sm:w-1/2 mx-auto my-15">
    <h1>MetaMask Auth Example App</h1>
  </div>
  <div class="p-10">

  <LoginButton />

  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
