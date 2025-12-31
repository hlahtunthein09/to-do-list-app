import { useState } from "react";
import "./ToDoList.css";

function ToDoList()
{
    const [ tasks, setTasks ] = useState([
        {text: "Wash clothes", completed: false}, 
        {text: "Cook Breakfast", completed: false},
        {text: "Take a bath", completed: false},
    ]);

    const [ newTask, setNewTask ] = useState("");

    function handleInputChange(event)
    {
        setNewTask(event.target.value);
    }

    function addTask()
    {
        if(newTask.trim() !== "")
        {
            setTasks(prevTask => (
                [...prevTask, 
                {text: newTask, completed: false}]
            ));
            setNewTask("");
        }
        
    }

    function toggleTask(index)
    {
        setTasks(prevTasks =>
                    prevTasks.map((task, i) => 
                        i === index ? {...task, completed: !task.completed} : task
                    )
        );
    }

    function deleteTask(index)
    {
        setTasks(prevTask => prevTask.filter((_, i) => i !== index));
        // const updatedTasks = tasks.filter((_, i) => i !== index);
        // setTasks(updatedTasks);
    }

    function moveUpTask(index)
    {
        setTasks(prevTasks => {
            if(index == 0) return prevTasks;

            const updatedTasks = [...prevTasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];

            return updatedTasks;
        })
    }

    function moveDownTask(index)
    {
        setTasks(prevTasks => {
            if(index === prevTasks.length - 1) return prevTasks;

            const updatedTasks = [...prevTasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];

            return updatedTasks;
        })
    }

    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <input 
                type="text"
                value={newTask}
                onChange={handleInputChange}
                placeholder="Enter a task..."
            />
            <button className="add-button" onClick={addTask}>
                Add
            </button>

            <div className="task-container">
                <ol> 
                    {tasks.map((task, index) => {

                        return(
                            <li key={index}>
                                <span className={`text ${task.completed ? "done" : ""}`}>{task.text}</span>

                                <button className="delete-button" onClick={() => deleteTask(index)}>
                                    Delete
                                </button>

                                <button className="move-button" onClick={() => moveUpTask(index)}>
                                    ☝️
                                </button>

                                <button className="move-button" onClick={() => moveDownTask(index)}>
                                    👇
                                </button>

                                <input 
                                    type = "checkbox"
                                    checked = {task.completed}
                                    onChange={() => toggleTask(index)}
                                />
                            </li>
                        )  
                    })}
                </ol>
            </div>
            
        </div>
    )
}

export default ToDoList;