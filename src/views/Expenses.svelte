<script lang="ts">
    import NavDrawer from "../components/NavDrawer.svelte";
    import { httpGet } from "../services/apiService";
    import type { Expense, Income } from "../services/types";
    import { format, startOfMonth, endOfMonth } from "date-fns";

    let formattedMonth = format(new Date(), "LLLL");

    let getData: Promise<any> = getExpenseData();

    function getExpenseData(): Promise<{
        expenses: Expense[];
        incomes: Income[];
    }> {
        return new Promise(async (resolve, reject) => {
            const monthStart: string = format(
                startOfMonth(new Date()),
                "yyyy-MM-dd"
            );
            const monthEnd: string = format(
                endOfMonth(new Date()),
                "yyyy-MM-dd"
            );

            try {
                const {
                    data: { data: expenses },
                } = await httpGet(
                    `/expenses?filters[issued_date][$between][0]=${monthStart}&filters[issued_date][$between][1]=${monthEnd}`
                );
                resolve(expenses);
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
        <h1 class="font-quicksand font-bold text-2xl">Expenses</h1>
        {#await getData}
            <p class="mb-4">Getting your expenses...</p>
            <img
                src="/img/walking-parrot.webp"
                alt="loading"
                class="rounded-full w-32 h-32 object-contain shadow-neu-out"
            />
        {:then value}
            <p class="mb-4">Viewing your expenses for {formattedMonth}:</p>
        {:catch error}
            <p class="mb-2 text-lg">
                The following error ocurred while getting your expenses:
            </p>
            <p class="italic mb-4">{error.message}</p>
            <img
                src="/img/blind-hamster.webp"
                alt="error"
                class="mb-4 rounded-full w-32 h-32 object-contain"
            />
            <button
                class="block px-8 py-2 bg-primary text-white rounded-lg transition-shadow hover:shadow-neu-out focus:shadow-neu-out"
                on:click={() => {
                    getData = getExpenseData();
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
