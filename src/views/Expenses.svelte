<script lang="ts">
    import NavDrawer from "../components/NavDrawer.svelte";
    import { httpGet } from "../services/apiService";
    import type { Expense } from "../services/types";
    import { format, startOfMonth, endOfMonth } from "date-fns";
    import DynamicTable from "../components/Tables/DynamicTable.svelte";

    let formattedMonth = format(new Date(), "LLLL");

    const tableHeaders = [
        { title: "ID", value: "id" },
        { title: "Date", value: "issued_date" },
        { title: "Amount", value: "amount" },
    ];

    let getData: Promise<any> = getExpenseData();

    function getExpenseData(): Promise<{
        expenses: Expense[];
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
                    `/expenses?filters[issued_date][$between][0]=${monthStart}&filters[issued_date][$between][1]=${monthEnd}&populate=tags`
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

    const edit = ({detail}): void => {
        console.log(detail);
    };
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
            <p>Viewing your expenses for {formattedMonth}:</p>
            <p class="mb-4 text-sm">
                You can edit any registry by clicking on it.
            </p>
            <DynamicTable
                on:onEditRequest={edit}
                headers={tableHeaders}
                data={value}
            />
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
