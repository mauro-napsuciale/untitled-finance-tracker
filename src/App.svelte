<script>
  import Auth from "./views/Auth.svelte";
  import Router from "svelte-spa-router";
  import Home from "./views/Home.svelte";

  const routes = {
    "/": Auth,
    "/home": Home,
  };
</script>

<main>
  <Router {routes} />
</main>

<style>
  /* your styles go here */
</style>
