import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import TodoForm from './components/Todoform'
import TodoItem from './components/Todoitem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todomsg) => {
    // purane array mai add kar do
    setTodos((prev) =>
      [
        {
          id: Date.now(),
          ...todomsg
        },
        ...prev
      ]
    )
  }

  const updateTodo = (id, todomsg) => {
    // agar id mil gya toh todomsg ko nhi toh prev ko us array mai dal do
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? todomsg : prevTodo))
  }

  const deleteTodo = (id) => {
    // jo jo id ke barabar nhi hai usko naya array mai dalte chalo
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    // object ke andar jao aur agar id mil gya toh true else false
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, status: !prevTodo.status } : prevTodo))
  }

  // parse aur stringify isiliy kar rahe cuz browser side se only string aata urf-16
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#362159de] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {
              todos.map((todo) =>
              (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              )
              )
            }
          </div>
        </div>
      </div>
    </TodoProvider>

  )
}

export default App
