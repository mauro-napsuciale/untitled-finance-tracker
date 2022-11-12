import { toast } from "@zerodevx/svelte-toast";

export const successToast = (message: string) => {
    toast.push(message, {
        classes: ['toast-success']
    });
};

export const errorToast = (message: string) => {
    toast.push(message, {
        classes: ['toast-error']
    });
};