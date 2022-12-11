<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let name: string = null;
    export let value: any = null;
    export let min: any = null;
    export let max: any = null;
    export let type: string = "text";
    export let placeholder: string = null;
    export let required: boolean = null;
    export let extraClasses: string = "";

    const emitChange = (event: any) => {
        dispatch("change", event.target.value);
    };
</script>

<!-- markup (zero or more items) goes here -->
<input
    {name}
    {value}
    {min}
    {max}
    {type}
    {placeholder}
    {required}
    on:change={emitChange}
    class="px-4 py-2 bg-transparent border-[1px] border-primary rounded-lg {extraClasses}"
/>

<style>
    /* your styles go here */
</style>
