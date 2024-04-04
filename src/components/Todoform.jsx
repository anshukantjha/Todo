import React, { useState } from 'react'
import { useTodo } from '../contexts'

function TodoForm() {
    const [todomsg, setTodomsg] = useState("")
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()
        // agar todo nahi hai form pe toh chale jao
        if (!todomsg) return
        // addTodo({id:Date.now(),todo:todo,completed:false})

        addTodo({ todomsg, status: false })
        setTodomsg("")
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todomsg}
                onChange={(e)=>setTodomsg(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

