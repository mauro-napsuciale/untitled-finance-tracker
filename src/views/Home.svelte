<script lang="ts">
    import NavDrawer from "../components/NavDrawer.svelte";
    import { httpGet } from "../services/apiService";
    import type { Expense, Income } from "../services/types";
    import { format, startOfYear, endOfYear } from "date-fns";

    let getData: Promise<any> = getDashboardData();

    const mappedTotal = (data: Expense[]) => {
        return data
            .map((expense) => expense.amount)
            .reduce((prev: number, curr: number) => prev + curr, 0);
    };

    function getDashboardData(): Promise<{
        expenses: Expense[];
        incomes: Income[];
    }> {
        return new Promise(async (resolve, reject) => {
            const yearStart: string = format(
                startOfYear(new Date()),
                "yyyy-MM-dd"
            );
            const yearEnd: string = format(endOfYear(new Date()), "yyyy-MM-dd");

            try {
                const {
                    data: { data: expenses },
                } = await httpGet(
                    `/expenses?filters[issued_date][$between][0]=${yearStart}&filters[issued_date][$between][1]=${yearEnd}`
                );
                const {
                    data: { data: incomes },
                } = await httpGet(
                    `/incomes?filters[perceived_date][$between][0]=${yearStart}&filters[perceived_date][$between][1]=${yearEnd}`
                );
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
                alt="loading"
                class="rounded-full w-32 h-32 object-contain shadow-neu-out"
            />
        {:then value}
            <p class="mb-4">Here's a quick brief of your expenses this year:</p>
            <!-- TODO: Pretty graphs -->
            <p>Expense movements {value.expenses.length}</p>
            <p>Total spent {mappedTotal(value.expenses)}</p>
            <p>Income movements {value.incomes.length}</p>
            <p>Total earned {mappedTotal(value.incomes)}</p>
        {:catch error}
            <p class="mb-2 text-lg">
                The following error ocurred while getting your data:
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
