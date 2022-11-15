<script lang="ts">
    import { httpGet } from "../services/apiService";
    import type { Expense, Income } from "../services/types";

    // your script goes here
    import NavDrawer from "../components/NavDrawer.svelte";

    let getData: Promise<any> = getDashboardData();

    function getDashboardData(): Promise<{
        expenses: Expense[];
        incomes: Income[];
    }> {
        return new Promise(async (resolve, reject) => {
            try {
                const {
                    data: { data: expenses },
                } = await httpGet("/expenses?filters[]");
                const {
                    data: { data: incomes },
                } = await httpGet("/incomes");
                resolve({ expenses, incomes });
            } catch (error) {
                const {
                    response: {
                        data: { error: errorObject },
                    },
                } = error;
                reject(errorObject);
            }
        });
    }
</script>

<!-- markup (zero or more items) goes here -->
<svelte:head>
    <title>Untitled Finance Tracker | Home</title>
</svelte:head>

<NavDrawer>
    <div class="p-4">
        <h1 class="font-quicksand font-bold text-2xl">Dashboard</h1>
        {#await getData}
            <p class="mb-4">Getting your data...</p>
            <img
                src="/img/walking-parrot.webp"
                alt="walking-parrot"
                class="rounded-full w-32 h-32 object-contain shadow-neu-out"
            />
        {:then value}
            <p class="mb-4">Here's a quick brief of your expenses:</p>
            <p>Expense movements {value.expenses.length}</p>
            <p>Income movements {value.incomes.length}</p>
        {:catch error}
            <p class="mb-2 text-lg">
                The following error ocurred while getting your data:
            </p>
            <p class="italic mb-4">{error.message}</p>
            <img
                src="/img/blind-hamster.webp"
                alt="blind-hamster"
                class="mb-4 rounded-full w-32 h-32 object-contain"
            />
            <button
                class="block px-8 py-2 bg-primary text-white rounded-lg transition-shadow hover:shadow-neu-out focus:shadow-neu-out"
                on:click={() => {
                    getData = getDashboardData();
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
