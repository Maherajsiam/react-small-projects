import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import uuid from "react-uuid";
const Local_Storage_Key = "todos.List";

const Index = () => {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(Local_Storage_Key));

    if (storedTodos !== null) {
      setTodos(storedTodos)
  }
  }, []);

  useEffect(() => {
    localStorage.setItem(Local_Storage_Key, JSON.stringify(todos));
  }, [todos]);
 

const toggleTodos = (id)=>{
const newTodos = [...todos]
const todo = newTodos.find(todo => todo.id ===id)
todo.complete = !todo.complete
setTodos(newTodos)
}
  const handleAddTodo = (e) =>{
    const name = todoNameRef.current.value;
    if (name) {
      setTodos((prevTodos) => {
        return [...prevTodos, { id: uuid(), name: name, complete: false }];
      });
    }

    todoNameRef.current.value = null;
  }


const handleTodoClear = (e)=>{
  const newTodos = todos.filter((todo)=> todo=!todo.complete)
  setTodos(newTodos)
}



  return (
    <>
      <TodoList todos={todos} toggleTodos={toggleTodos}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleTodoClear}>Clear Complete</button>
      <div>{todos.filter((todo)=> !todo.complete).length} left to do</div>
    </>
  );
};

export default Index;
