import {createContext,useContext} from 'react'

export const TodoContext = createContext({
    todos:[
        {
            id:"",
            todomsg:"todo message",
            status:false
        }
    ],
    addTodo:(todomsg)=>{},
    updateTodo:(id,todomsg)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{}
})

// custom hook
export const useTodo=()=>{
    return useContext(TodoContext)
}
// provider 
export const TodoProvider=TodoContext.Provider