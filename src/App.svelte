<script>
  import Auth from "./views/Auth.svelte";
  import Router from "svelte-spa-router";
  import Home from "./views/Home.svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  const routes = {
    "/": Auth,
    "/home": Home,
  };
</script>

<main>
  <Router {routes} />
  <SvelteToast />
</main>

<style>
  /* Tailwind color config ref
        'base-color': "#E1E1E1",
        primary: "#7c7287",
        accent: "#119DA4",
        success: '#94B49F',
        warning: '#ECB390',
        info: '#B7CADB',
        error: '#DF7861',
  */
  :global(.toast-success) {
    --toastBackground: #94b49f;
    --toastBarBackground: transparent;
    --toastBarHeight: 0;
    --toastBorderRadius: 0.5rem;
    --toastMargin: 0 0 1.5rem 0;
    --toastMsgPadding: 0.5rem 1rem;
    --toastBtnContent: "";
    --toastBoxShadow: -6px 6px 12px rgba(175, 175, 175, 1),
      6px -6px 24px rgba(255, 255, 255, 0.75);
  }
  :global(.toast-error) {
    --toastBackground: #df7861;
    --toastBarBackground: transparent;
    --toastBarHeight: 0;
    --toastBorderRadius: 0.5rem;
    --toastMargin: 0 0 1.5rem 0;
    --toastMsgPadding: 0.5rem 1rem;
    --toastBtnContent: "";
    --toastBoxShadow: -6px 6px 12px rgba(175, 175, 175, 1),
      6px -6px 24px rgba(255, 255, 255, 0.75);
  }
</style>
