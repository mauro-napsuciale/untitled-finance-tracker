<script lang="ts">
    import Icon from "@iconify/svelte";
    import type { User } from "../services/types";
    import { link, replace } from "svelte-spa-router";

    let isMenuOpen: boolean = false;

    const session: User = JSON.parse(
        sessionStorage.getItem("uft-session") as string
    );

    const backendURL: string = import.meta.env.VITE_BACKEND_URL;

    const logout = () => {
        sessionStorage.removeItem("ufa-session");
        replace("/");
    };
</script>

<!-- markup (zero or more items) goes here -->
<nav class="sticky top-0 left-0 px-4 md:px-0 font-quicksand">
    <div
        class="container max-w-7xl mx-auto p-4 my-4 flex justify-between items-center transition-shadow focus-within:shadow-neu-out hover:shadow-neu-out rounded-lg  bg-base-color"
    >
        <div class="flex items-center gap-4">
            {#if session?.avatar != null}
                <img
                    src={backendURL + session.avatar.url}
                    alt="logo"
                    class="w-12 h-12 rounded-full shadow-neu-out"
                />
            {:else}
                <img
                    src="/img/stonks.webp"
                    alt="logo"
                    class="w-24 rounded-lg shadow-neu-out"
                />
            {/if}
            <p class="md:text-lg">
                {session?.name}
            </p>
        </div>
        <div class="hidden md:flex justify-between items-center gap-4 md:gap-8">
            <button
                class="p-3 rounded-full bg-primary text-base-color shadow-neu-out"
                on:click={logout}
            >
                <Icon icon="mdi:login" />
            </button>
        </div>
        <button
            class="block md:hidden p-2 rounded-full bg-primary text-base-color shadow-neu-out"
            on:click={() => {
                isMenuOpen = true;
            }}
        >
            <Icon icon="mdi:menu-open" width={32} height={32} />
        </button>
    </div>
</nav>

<div
    class="fixed top-4 left-4 -right-4 bottom-4 neumorph-out md:hidden z-50 transition-transform duration-[200ms] {isMenuOpen
        ? 'translate-x-0'
        : 'translate-x-full'}"
>
    <div class="flex flex-col items-center bg-base-color p-4 rounded-lg">
        <button
            class="p-3 rounded-full bg-base-color shadow-neu-out self-end mb-4"
            on:click={() => {
                isMenuOpen = false;
            }}
        >
            <Icon icon="mdi:close" />
        </button>
        <div class="mb-8">
            <img
                src="/img/doge-alt.webp"
                alt="logo"
                class="w-32 rounded-full shadow-neu-out mx-auto mb-4"
            />
            <h1 class="text-xl text-center">Untitled Fiance Tracker</h1>
        </div>
        <div class="text-center">
            <a
                href="/home"
                class="block px-4 py-2 my-2 transition-shadow focus:shadow-neu-in rounded-lg"
                use:link
            >
                Dashboard
            </a>
            <a
                href="/expenses"
                class="block px-4 py-2 my-2 transition-shadow focus:shadow-neu-in rounded-lg"
                use:link
            >
                Expenses
            </a>
            <button
                class="px-8 py-2 bg-primary text-base-color neumorph-out"
                on:click={logout}
            >
                Logout
                <Icon icon="mdi:login" class="inline" />
            </button>
        </div>
    </div>
</div>

<div class="container max-w-7xl mx-auto px-4 md:px-0">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="hidden md:block font-quicksand col-span-1">
            <div class="container min-h-[512px] p-4 neumorph-out">
                <a
                    href="/home"
                    class="block px-4 py-2 my-2 neumorph-in"
                    use:link
                >
                    Dashboard
                </a>
                <a
                    href="/expenses"
                    class="block px-4 py-2 my-2 neumorph-in"
                    use:link
                >
                    Expenses
                </a>
            </div>
        </div>
        <div class="md:col-span-3">
            <div
                class="p-4 min-h-[512px] transition-shadow hover:shadow-neu-in focus-within:shadow-neu-in rounded-lg"
            >
                <slot>This is default content</slot>
            </div>
        </div>
    </div>
</div>

<style>
    /* your styles go here */
</style>
