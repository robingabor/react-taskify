import React from 'react';
import { Todo } from '../model';
import SingleTodo from './SingleTodo.tsx';
import { Droppable } from 'react-beautiful-dnd';
import './styles.css';

interface Props {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  completedTodos: Todo[],
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos, 
  completedTodos, 
  setCompletedTodos
}) => {
  return (
    
    <div className="container">

      {/* Active Tasks - Drop Zone*/}
      <Droppable droppableId='TodoList'>
        {
          (provided,snapshot)=> (
            // React Beautuful DND need to control it a droppable zone we need a ref and to spread the droppableProp
            <div 
              className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`} 
              ref={provided.innerRef} 
              {...provided.droppableProps}
            >

              <span className="todos__heading">
                Active Tasks
              </span>
        
              {
                todos?.map((todo,index) => {
                  return (
                  <SingleTodo
                    index={index}
                    key={todo.id}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                  />
                  )
                })
              } 

               {/* Placeolder */}
              {provided.placeholder}
            </div>
          )            
        }
      </Droppable>      

      {/* Completed tasks - Drop Zone */}
      <Droppable droppableId='TodosRemove'>
        {
          (provided,snapshot) => (
            <div 
              className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete' : ''}`}
              ref={provided.innerRef} 
              {...provided.droppableProps}
            >
              <span className="todos__heading">
                Completed Tasks
              </span>
        
              {
                completedTodos?.map((todo,index) => {
                  return (
                    <SingleTodo
                      index={index}
                      key={todo.id}
                      todo={todo}
                      todos={completedTodos}
                      setTodos={setCompletedTodos}
                    />
                    )
                })
              }        
              {/* Placeolder */}
              {provided.placeholder}
            </div>
          )
        }
      
      </Droppable>
      

    </div>
    
  )
}

export default TodoList