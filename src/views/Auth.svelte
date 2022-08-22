<script lang="ts">
    import Input from "../components/Forms/Input.svelte";
    import Icon from "@iconify/svelte";
    import { push } from "svelte-spa-router";

    let user: string = null;
    let password: string = null;

    const handleForm = (event: any) => {
        const data: object = Object.fromEntries(
            new FormData(event.target).entries()
        );
        console.log(data);

        // TODO: Connect with API.

        push("/home");
    };
</script>

<svelte:head>
    <title>Untitled Finance Tracker | Login</title>
</svelte:head>

<div class="w-full min-h-screen flex items-center">
    <div class="container max-w-sm mx-4 md:mx-auto">
        <img
            src="/img/doge_alt.webp"
            alt="dog"
            class="w-48 h-48 md:w-64 md:h-64 rounded-full mb-8 mx-auto object-cover shadow-neu-out"
        />
        <div class="p-8 rounded-md shadow-neu-in">
            <h2 class="text-2xl text-center">Untitled Finance Tracker</h2>
            <form on:submit|preventDefault={handleForm}>
                <Input
                    extraClasses={"transition-shadow hover:shadow-neu-out focus:shadow-neu-out"}
                    placeholder={"User"}
                    name={"user"}
                    value={user}
                />
                <Input
                    extraClasses={"transition-shadow hover:shadow-neu-out focus:shadow-neu-out"}
                    type={"password"}
                    placeholder={"Password"}
                    name={"password"}
                    value={password}
                />
                <button
                    type="submit"
                    class="px-8 py-2 mt-4 shadow-neu-out bg-primary rounded-lg text-base-color"
                >
                    Login
                    <Icon icon="mdi:login" class="inline" />
                </button>
            </form>
        </div>
    </div>
</div>

<style>
</style>
