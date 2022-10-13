export type Category = {
    id: number,
    name: string,
    expenses: Expense[],
    incomes: Income[],
}

export type Expense = {
    id: number,
    amount: number,
    issued_date: string | Date,
    notes: string,
    ticket: Media,
    goal: Goal,
    category: Category,
    tags: Tag[]
}

export type Goal = {
    id: number,
    name: string,
    descripcion: string,
    amount: number,
    completed: boolean,
    expenses: Expense[],
    incomes: Income[],
    tags: Tag[],
}

export type Income = {
    id: number,
    amount: number,
    perceived_date: string | Date,
    notes: string,
    ticket: Media,
    goal: Goal,
    category: Category,
    tags: Tag[],
}

export type Media = {
    id: number,
    name: string,
    url: string,
    mime: string,
    ext: string,
}

export type Tag = {
    id: number,
    name: string,
    expenses: Expense[],
    incomes: Income[],
    goals: Goal[],
}

export type User = {
    id: number,
    username: string,
    email: string,
    name: string,
    nickname: string,
    avatar: Media
}