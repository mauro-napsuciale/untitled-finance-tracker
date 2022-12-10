<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";

    type HeaderConfig = {
        title: string;
        value: string;
    };
    
    const dispatch = createEventDispatcher();
    export let headers: HeaderConfig[] | null = null;
    export let data: any[] | null = null;

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
    <table class="w-full">
        <thead class="hidden md:block">
            <tr class="flex items-center mb-2 p-2 neumorph-out">
                {#each headers as header}
                    <th class="flex-1 text-left">{header.title}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#if data != null && data.length > 0}
                {#each Object.entries(data) as [_, dataRow]}
                    <tr
                        class="flex items-center p-2 cursor-pointer neumorph-in"
                        on:click={() => emitEditRequest(dataRow)}
                    >
                        {#each headers as head}
                            <td
                                class="flex-1 flex justify-between md:justify-start items-center"
                            >
                                <span class="block md:hidden">
                                    {head.title}
                                </span>
                                <span>
                                    {getValueByNestedProp(dataRow, head.value)}
                                </span>
                            </td>
                        {/each}
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td>No data</td>
                </tr>
            {/if}
        </tbody>
    </table>
{/if}
