<script>
    import Icon from "@iconify/svelte";
    import { link, push } from "svelte-spa-router";

    const logout = () => {
        sessionStorage.removeItem("ufa-session");
        push("/");
    };
</script>

<!-- markup (zero or more items) goes here -->
<nav class="sticky top-0 left-0 px-4 md:px-0 font-quicksand">
    <div
        class="container max-w-7xl mx-auto p-4 my-4 flex justify-between items-center neumorph-out bg-base-color"
    >
        <img
            src="/img/stonks.webp"
            alt="logo"
            class="w-24 rounded-lg shadow-neu-out"
        />
        <div class="flex justify-between items-center gap-4 md:gap-8">
            <a href="/home" class="px-4 py-2 neumorph-in" use:link
                >Test anchor</a
            >
            <button
                class="p-3 rounded-full bg-primary text-base-color shadow-neu-out"
                on:click={logout}
            >
                <Icon icon="mdi:login" />
            </button>
        </div>
    </div>
</nav>

<div class="container max-w-7xl mx-auto px-4 md:px-0">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="font-quicksand md:col-span-1">
            <div class="container min-h-[512px] p-4 neumorph-out">
                <ul class="list-none">
                    <li class="px-4 py-2 my-2 neumorph-in">
                        <a href="/home" use:link>Test anchor</a>
                    </li>
                    <li class="px-4 py-2 my-2 neumorph-in">
                        <a href="/home" use:link>Test anchor</a>
                    </li>
                    <li class="px-4 py-2 my-2 neumorph-in">
                        <a href="/home" use:link>Test anchor</a>
                    </li>
                    <li class="px-4 py-2 my-2 neumorph-in">
                        <a href="/home" use:link>Test anchor</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="md:col-span-3">
            <div class="p-4 min-h-[512px] neumorph-in">
                <slot>This is default content</slot>
            </div>
        </div>
    </div>
</div>

<style>
    /* your styles go here */
</style>
