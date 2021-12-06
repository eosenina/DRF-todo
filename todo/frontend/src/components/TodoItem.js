import React from "react";

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{ todo.caption }</td>
            <td>{ todo.text }</td>
            <td>{ todo.project }</td>
            <td>{ todo.state }</td>
            <td>{ todo.created }</td>
            <td>{ todo.updated }</td>
            <td>{ todo.author }</td>
        </tr>
    )
}

export default TodoItem;