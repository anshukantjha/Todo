import React,{useState} from "react";
import {useTodo} from "../contexts/index"


function TodoItem({ todo }) {
    const [isTodoEditible, setIsTodoEditible] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todomsg)
    const {updateTodo,deleteTodo,toggleComplete} =useTodo()

    const editTodo=()=>{
        updateTodo(todo.id,{...todo,todomsg:todoMsg})
        setIsTodoEditible(false)
    }

    const togguComplete = ()=>{
        toggleComplete(todo.id)
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.status ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.status}
                onChange={togguComplete}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditible ? "border-black/10 px-2" : "border-transparent"
                } ${todo.status ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditible}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.status) return;

                    if (isTodoEditible) {
                        editTodo();
                    } else setIsTodoEditible((prev) => !prev);
                }}
                disabled={todo.status}
            >
                {isTodoEditible ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
