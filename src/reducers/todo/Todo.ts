export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    date: string;
}

export interface Reaction {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    eyes: number;
}