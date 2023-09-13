import { writable } from 'svelte/store';

export const todos = writable([
    {
        id: 1,
        title: "Finish Svelte screencast",
        isComplete: false,
        isEditing: false,
    },
    {
        id: 2,
        title: "Go shopping",
        isComplete: true,
        isEditing: false,
    },
    {
        id: 3,
        title: "Take over world",
        isComplete: false,
        isEditing: false,
    },
]);