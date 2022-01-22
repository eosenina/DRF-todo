import React from "react";

const TodoItem = ({users, projects, todo, deleteTodo}) => {
    return (
        <tr>
            <td>{todo.caption}</td>
            <td>{todo.text}</td>
            <td>{projects.find((project) => project.id == todo.project).name}</td>
            <td>{todo.created}</td>
            <td>{todo.updated}</td>
            <td>{users.find((user) => user.id == todo.author).username}</td>
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