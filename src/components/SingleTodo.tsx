import React, {useState, useRef,useEffect} from 'react';
import { Todo } from '../model';
import {AiFillEdit, AiFillDelete,} from 'react-icons/ai';
import {MdDone} from 'react-icons/md';
import "./styles.css";
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({index,todo,todos,setTodos}) => {

    // state for edit functionality
    let [edit,setEdit] = useState<boolean>(false);
    let [editTodo, setEditTodo] = useState<string>(todo.content);
    const inputRef = useRef<HTMLInputElement>(null);

    // Whenever the edit changes, it going to fire off 
    useEffect(()=> {
        // shift focus from to the  input box
        inputRef.current?.focus()
    }, [edit])

    const completeHandler = () => {

        setTodos(
            todos.map((item)=> {
                return item.id === todo.id ? {...todo,isCompleted: !todo.isCompleted} : item;
            })
        ) 
    }

    const deleteHandler = () => {

        setTodos(todos.filter(item => {
            return item.id !== todo.id;
        }))

    }

    const editHandler = () => {

        if(!edit && !todo.isCompleted){
            setEdit(!edit)            
        }     
        
    }

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {
            (provided)=> (
                // the best is to use a form again, considering the edit functionality
                <form                      
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="todos__single"
                    onSubmit={(e: React.FormEvent) => {
                        e.preventDefault();
                        setTodos(todos.map(item => {
                            return item.id === todo.id ? {...todo,content: editTodo} : item;
                        }))
                        setEdit(false)
                    }}
                >        
                
                {/* if we are in edit mode, then we need an input insead of the span */}
                {edit ? (
                    <input type="text"
                        ref={inputRef}
                        className="todos__single--text"
                        value={editTodo}
                        onChange={(e) => {
                            setEditTodo(e.target.value)
                        }}
                    />
                ):(
                    todo.isCompleted ? (
                        <s className="todos__single--text">
                        {todo.content}
                    </s>
                    ) : (
                        <span className="todos__single--text">
                            {todo.content}
                        </span>
                    )            
                )
                }
                    
                
                {/* Buutons */}
                <div>
                    {/* EDIT */}
                    <span
                        onClick={editHandler}
                        className="icon">
                        <AiFillEdit 
                    />
                    </span>
                    {/* DELETE */}
                    <span 
                        onClick={deleteHandler}
                        className="icon"
                    >
                        <AiFillDelete />
                    </span>
                    {/* COMPLETE */}
                    <span 
                        onClick={completeHandler}
                        className="icon"
                    >
                        <MdDone />
                    </span>
                </div>
                
                </form>
            )
        }        
    </Draggable>
  )
}

export default SingleTodo