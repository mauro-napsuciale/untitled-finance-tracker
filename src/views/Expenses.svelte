<script lang="ts">
    import NavDrawer from "../components/NavDrawer.svelte";
    import {
        httpDelete,
        httpGet,
        httpPost,
        httpPut,
    } from "../services/apiService";
    import type { Expense } from "../services/types";
    import { format, startOfMonth, endOfMonth } from "date-fns";
    import DynamicTable from "../components/Tables/DynamicTable.svelte";
    import Carousel from "svelte-carousel";
    import Input from "../components/Forms/Input.svelte";
    import Icon from "@iconify/svelte";
    import { errorToast, successToast } from "../services/toastService";
    import { currencyPipe } from "../helpers/pipes";

    const getData = () => {
        dataFunc = getExpenseData();
    };

    const tableHeaders = [
        { title: "ID", value: "id" },
        { title: "Date", value: "issued_date" },
        { title: "Amount", value: "amount", pipe: currencyPipe },
    ];

    let carousel;
    let selectedMonth = format(new Date(), "yyyy-MM");
    let selectedForEdition: Expense | null = null;

    const add = (): void => {
        carousel.goToNext();
    };

    const edit = ({ detail }: { detail: Expense }): void => {
        selectedForEdition = detail;
        carousel.goToNext();
    };

    const deleteReg = async () => {
        try {
            const { data } = await httpDelete(
                "/expenses/" + selectedForEdition.id
            );
            successToast("Expense deleted 💸");
            getData();
        } catch (error) {
            errorToast(
                (error?.response?.data?.error?.message ??
                    "An error has ocurred") + " 😬"
            );
        }
    };

    const handleForm = async (event: SubmitEvent) => {
        const body: object = Object.fromEntries(
            new FormData(event.target as HTMLFormElement).entries()
        );

        if (selectedForEdition != null) {
            try {
                const { data: editData } = await httpPut(
                    "/expenses/" + selectedForEdition.id,
                    body
                );
                successToast("Expense edited ✨");
                getData();
                return;
            } catch (error) {
                errorToast(
                    (error?.response?.data?.error?.message ??
                        "An error has ocurred") + " 😬"
                );
                return;
            }
        }

        try {
            const { data } = await httpPost("/expenses", body);
            successToast("Expense added ✨");
            getData();
        } catch (error) {
            errorToast(
                (error?.response?.data?.error?.message ??
                    "An error has ocurred") + " 😬"
            );
        }
    };

    function getExpenseData(): Promise<{
        expenses: Expense[];
    }> {
        return new Promise(async (resolve, reject) => {
            if (selectedMonth == null) {
                return reject({
                    message: "Select a month to view your expenses",
                });
            }

            const monthStart: string = format(
                startOfMonth(new Date(selectedMonth + "-15")),
                "yyyy-MM-dd"
            );
            const monthEnd: string = format(
                endOfMonth(new Date(selectedMonth + "-15")),
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

    let dataFunc: Promise<any> = getExpenseData();
</script>

<!-- markup (zero or more items) goes here -->
<svelte:head>
    <title>Untitled Finance Tracker | Home</title>
</svelte:head>

<NavDrawer>
    <h1 class="font-quicksand font-bold text-2xl">Expenses</h1>
    <p class="mb-4 text-sm">You can edit any registry by clicking on it.</p>
    <div class="flex justify-between items-center mb-4">
        <Input
            value={selectedMonth}
            on:change={({ detail }) => {
                selectedMonth = detail;
                getData();
            }}
            type="month"
        />
        <div>
            <button
                class="m-3 w-8 h-8 rounded-full bg-primary text-base-color shadow-neu-out"
                on:click={getData}
            >
                <Icon icon="mdi:update" class="m-auto" />
            </button>
            <button
                class="m-3 w-8 h-8 rounded-full bg-accent text-base-color shadow-neu-out"
                on:click={add}
            >
                <Icon icon="mdi:add" class="m-auto" />
            </button>
        </div>
    </div>
    {#await dataFunc}
        <p class="mb-4">Getting your expenses...</p>
        <img
            src="/img/walking-parrot.webp"
            alt="loading"
            class="rounded-full w-32 h-32 object-contain shadow-neu-out"
        />
    {:then value}
        <Carousel
            bind:this={carousel}
            arrows={false}
            infinite={false}
            dots={false}
        >
            <div>
                <DynamicTable
                    on:onEditRequest={edit}
                    headers={tableHeaders}
                    data={value}
                    noDataText="No expenses found on {selectedMonth}"
                />
            </div>
            <div>
                <div class="flex gap-4 items-center mb-4">
                    <button
                        class="m-3 w-8 h-8 rounded-full bg-accent text-base-color shadow-neu-out"
                        on:click={() => {
                            carousel.goToPrev();
                            selectedForEdition = null;
                        }}
                    >
                        <Icon icon="mdi:keyboard-return" class="inline" />
                    </button>
                    <h3 class="text-lg font-bold">
                        {selectedForEdition == null
                            ? "Add expense"
                            : "Edit expense"}
                    </h3>
                </div>
                <form on:submit|preventDefault={handleForm}>
                    <div class="flex flex-col mb-4">
                        <label class="text-sm" for="issued_date"
                            >Issued date</label
                        >
                        <Input
                            value={selectedForEdition?.issued_date}
                            name="issued_date"
                            type="date"
                            extraClasses="max-w-sm"
                        />
                    </div>
                    <div class="flex flex-col mb-4">
                        <label class="text-sm" for="amount">Amount</label>
                        <Input
                            value={selectedForEdition?.amount}
                            name="amount"
                            type="number"
                            min={0}
                            extraClasses="max-w-sm"
                        />
                    </div>
                    <div class="flex flex-col mb-4">
                        <label class="text-sm" for="notes">Notes</label>
                        <Input
                            value={selectedForEdition?.notes}
                            name="notes"
                            type="text"
                            extraClasses="max-w-sm"
                        />
                    </div>
                    <div class="flex justify-between items-center max-w-sm">
                        <button
                            type="submit"
                            class="px-4 py-2 rounded-lg bg-primary text-base-color shadow-new-out"
                        >
                            {selectedForEdition == null
                                ? "Add expense"
                                : "Edit expense"}
                        </button>
                        {#if selectedForEdition != null}
                            <button
                                type="button"
                                class="px-4 py-2 rounded-lg bg-warning text-base-color shadow-new-out"
                                on:click={deleteReg}
                            >
                                Delete
                            </button>
                        {/if}
                    </div>
                </form>
            </div>
        </Carousel>
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
            class="block px-8 py-2 bg-primary text-base-color rounded-lg transition-shadow hover:shadow-neu-out focus:shadow-neu-out"
            on:click={() => {
                getData();
            }}
        >
            Try again?
        </button>
    {/await}
</NavDrawer>

<style>
    /* your styles go here */
</style>
