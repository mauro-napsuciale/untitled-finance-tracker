export const currencyPipe = (number: number | null) => {
    if (number == null) {
        return "---";
    }

    return new Intl.NumberFormat('mx-MX', { style: 'currency', currency: 'MXN' }).format(number);
};