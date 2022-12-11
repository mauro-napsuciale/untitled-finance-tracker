<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";

    type HeaderConfig = {
        title: string;
        value: string;
        pipe?: Function;
    };

    const dispatch = createEventDispatcher();
    export let headers: HeaderConfig[] | null = null;
    export let data: any[] | null = null;
    export let noDataText: string | null = null;

    const getValueByNestedProp = (object: object, propString: string) => {
        let value = object;

        const props = propString.split(".");

        for (let index = 0; index < props.length; index += 1) {
            if (props[index] === undefined) break;
            value = value[props[index]];
        }
        return value;
    };

    const emitEditRequest = (data: any): void => {
        dispatch("onEditRequest", data);
    };

    onMount(() => {
        if (headers == null) {
            throw new Error("No headers were provided for data table");
        }
    });
</script>

{#if headers != null}
    {#if data != null && data.length > 0}
        <table class="w-full">
            <thead class="hidden md:block">
                <tr class="flex items-center mb-2 p-2">
                    {#each headers as header}
                        <th class="flex-1 text-left">{header.title}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each Object.entries(data) as [_, dataRow]}
                    <tr
                        class="flex flex-col md:flex-row items-center p-2 cursor-pointer neumorph-in"
                        on:click={() => emitEditRequest(dataRow)}
                    >
                        {#each headers as head}
                            <td
                                class="md:flex-1 flex justify-between md:justify-start items-center w-full md:w-auto"
                            >
                                <span class="block md:hidden font-bold">
                                    {head.title}
                                </span>
                                <span>
                                    {head.pipe != null
                                        ? head.pipe(
                                              getValueByNestedProp(
                                                  dataRow,
                                                  head.value
                                              )
                                          )
                                        : getValueByNestedProp(
                                              dataRow,
                                              head.value
                                          )}
                                </span>
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <img
            src="/img/doge-alt.webp"
            alt="no-data"
            class="w-24 h-24 object-contain rounded-full mb-4"
        />
        <p>{noDataText ?? "No data"}</p>
    {/if}
{/if}
