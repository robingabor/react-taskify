export interface Todo {
    id: number;
    content: string;
    isCompleted: boolean
}

// create a type wich going to containt our 3 actions
export type Actions =
{type: 'add', payload: string}
| {type: 'remove', payload: number}
| {type: 'done', payload: number}

