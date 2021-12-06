import React from "react";
import App from "../App";
import TodoItem from "./TodoItem";


const TodoList = ({todos}) => {

    return (
        <table>
            <th> Caption </th>
            <th> Text </th>
            <th> Project </th>
            <th> State </th>
            <th> Creation date </th>
            <th> Last update </th>
            <th> Author </th>
            {todos.map((todo) => <TodoItem todo = {todo} />)}
        </table>
    )
}

export default TodoList;