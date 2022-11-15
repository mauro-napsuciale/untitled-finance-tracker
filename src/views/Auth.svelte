<script lang="ts">
    import Input from "../components/Forms/Input.svelte";
    import Icon from "@iconify/svelte";
    import { push } from "svelte-spa-router";
    import { login } from "../services/apiService";
    import { sha512 } from "js-sha512";
    import { errorToast, successToast } from "../services/toastService";

    let identifier: string | null = null;
    let password: string | null = null;

    const handleForm = async (event: any) => {
        let body: any = Object.fromEntries(
            new FormData(event.target).entries()
        );
        body.password = sha512(body.password);

        try {
            const { data } = await login(body);
            sessionStorage.setItem("uft-token", data.jwt);
            sessionStorage.setItem("uft-session", JSON.stringify(data.user));

            push("/home");
            successToast("Welcome 🎉");
        } catch (err) {
            const {
                response: {
                    data: {
                        error: { message },
                    },
                },
            } = err;
            errorToast(`${message ?? "An error has ocurred"} 😬`);
        }
    };
</script>

<svelte:head>
    <title>Untitled Finance Tracker | Login</title>
</svelte:head>

<div class="w-full min-h-screen flex items-center">
    <div class="container max-w-sm mx-4 md:mx-auto">
        <img
            src="/img/doge-alt.webp"
            alt="dog"
            class="w-48 h-48 md:w-64 md:h-64 rounded-full mb-8 mx-auto object-cover shadow-neu-out"
        />
        <div
            class="p-8 rounded-md transition-shadow focus-within:shadow-neu-in md:hover:shadow-neu-in"
        >
            <h2 class="text-2xl text-center">Untitled Finance Tracker</h2>
            <form on:submit|preventDefault={handleForm}>
                <Input
                    extraClasses={"transition-shadow hover:shadow-neu-out focus:shadow-neu-out"}
                    placeholder={"User"}
                    name={"identifier"}
                    value={identifier}
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
                    class="px-8 py-2 mt-4 hover:shadow-neu-out focus:shadow-neu-out bg-primary rounded-lg text-base-color"
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
