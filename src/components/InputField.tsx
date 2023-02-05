import React, {useRef} from 'react';
import './styles.css';


interface Props {
    inputText: string;
    setInputText: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({inputText,setInputText,handleAdd} ) => {

    // In general React handles all DOM manipulation
    // but there are some instances where useRef can be used in the DOM
    // useRef can be use to store mutable value that does not cause re-render when updated
    // useRef only returs an object called : "current"
    // we Can Also use it for tracking state changes because we are able to persist useRef values between renders
   const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form 
        className="input"  
        onSubmit={(e)=> {
            handleAdd(e)
            // shift focus from the input box
            inputRef.current?.blur()
        }}
    >
        <input
            ref={inputRef}
            type="text"  
            value={inputText}
            onChange={(e: Event)=> setInputText(e.target.value)}  
            placeholder="Enter a task" 
            className="input_box" 
        />
        <button 
            type="submit"
            className="input_submit" 
        >
            GO
        </button>
    </form>
  )
}


export default InputField;