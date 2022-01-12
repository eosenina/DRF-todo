import React from "react";

const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>{todo.caption}</td>
            <td>{todo.text}</td>
            <td>{todo.project}</td>
            <td>{todo.created}</td>
            <td>{todo.updated}</td>
            <td>{todo.author}</td>
            <td>{todo.state}</td>
            <td>
                { todo.state !== 'CLS' &&
                    <button onClick={() => deleteTodo(todo.id)} type='button'>Delete</button>
                }
            </td>

        </tr>
    )
}

export default TodoItem;