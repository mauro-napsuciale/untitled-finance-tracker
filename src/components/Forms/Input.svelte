<script lang="ts">
    export let name: string = null;
    export let value: any = null;
    export let type: string = "text";
    export let placeholder: string = null;
    export let required: boolean = null;
    export let extraClasses: string = "";
</script>

<!-- markup (zero or more items) goes here -->
<input
    {name}
    {value}
    {type}
    {placeholder}
    {required}
    class="p-4 my-4 w-full bg-transparent border-[1px] border-primary rounded-lg {extraClasses}"
/>

<style>
    /* your styles go here */
</style>
