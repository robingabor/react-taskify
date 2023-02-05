import React, {useState} from 'react';
import './App.css';
import { Todo } from './model';
import InputField from './components/InputField.tsx';
import TodoList from './components/TodoList.tsx';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';


// App is a type of FC wich means : Functional Componetn
const App: React.FC = () => {
  // State:
  // lets use generics
  const [inputText, setInputText] = useState<string>("");
  const [todos,setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  // Going to take an event from onsubmit
  const handleAdd = (e: React.FormEvent) => {

    e.preventDefault();     

    // check if we have any input
    if(inputText){

      let newTodo: Todo = {
        id: Math.floor(Math.random()*1000),
        content: inputText,
        isCompleted: false
      }

      // lets spread in the todos we are already have, and add a new one
      setTodos([...todos,newTodo]);

      // Finally lets clear the input
      setInputText('');
    }

  }
  

  const onDragEnd = (result:DropResult) => {
    const {source, destination} = result;

    // first check if there is destination or not, we can null if we drop it in the nowhere
    if(!destination) return;
    // check if we drop in the same place : source === destinatioon
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let add,active = todos,
        complete = completedTodos;

    if(source.droppableId === 'TodoList') {
      add=active[source.index]
      active.splice(source.index,1)
    }else{
      add=complete[source.index]
      complete.splice(source.index,1)
    }

    // add to the destination
    if(destination.droppableId === 'TodoList') {
      
      active.splice(destination.index, 0, add)
    }else{
      
      complete.splice(destination.index, 0, add)
    }

    setCompletedTodos(complete);
    setTodos(active)

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">

        <span className="heading">Taskify</span>      

        <InputField
          inputText={inputText}
          setInputText={setInputText}
          handleAdd={handleAdd}
        />

        <TodoList 
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
        

        <h2>{inputText}</h2>

      </div>
    </DragDropContext>
  );
}

export default App;
