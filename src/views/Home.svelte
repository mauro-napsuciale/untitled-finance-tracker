<script lang="ts">
    // your script goes here
    import NavDrawer from "../components/NavDrawer.svelte";

    let getData: Promise<any> = fakeAsync();

    async function fakeAsync(): Promise<any> {
        return new Promise((resolve, reject) =>
            setTimeout(() => {
                reject("holi");
            }, 2000)
        );
    }
</script>

<!-- markup (zero or more items) goes here -->
<svelte:head>
    <title>Untitled Finance Tracker | Home</title>
</svelte:head>

<NavDrawer>
    <div class="p-4">
        <h1 class="font-quicksand font-bold text-2xl">Hi there</h1>
        {#await getData}
            <p class="mb-4">Getting your data...</p>
            <img
                src="/img/walking-parrot.webp"
                alt="walking-parrot"
                class="rounded-full w-32 h-32 object-contain"
            />
        {:then value}
            <p class="mb-4">Here's a quick brief of your expenses:</p>
            <p>{value}</p>
        {:catch error}
            <p class="mb-4">An error ocurred while getting your data</p>
            <img
                src="/img/blind-hamster.webp"
                alt="blind-hamster"
                class="mb-4 rounded-full w-32 h-32 object-contain"
            />
            <button
                class="block px-8 py-2 bg-primary text-white rounded-lg shadow-neu-out"
                on:click={() => {
                    getData = fakeAsync();
                }}
            >
                Try again?
            </button>
        {/await}
    </div>
</NavDrawer>

<style>
    /* your styles go here */
</style>
