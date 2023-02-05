import { Todo, Actions } from "../model"

export const TodoReducer(state:Todo[], action:Actions) => {
    // we want 3 things: edit Todo, remove todo, done
    switch(action.type){
        case 'add':
            return [
                ...state,
                { id: Date.now(), content: action.payload, isCompleted: false}
            ]
        case 'remove':
            return state.filter(item => {
                return item.id !== action.payload
            })
        case 'done':
            return state.map( item => {
                return item.id === action.payload ? {...item, isCompleted: !item.isCompleted }
            })
    }

}