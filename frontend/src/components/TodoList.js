import React from "react";
import App from "../App";
import TodoItem from "./TodoItem";
import {Link} from "react-router-dom";


const TodoList = ({users, projects, todos, deleteTodo}) => {

    return (
        <div>
            <table>
                <th> Caption</th>
                <th> Text</th>
                <th> Project</th>
                <th> Creation date</th>
                <th> Last update</th>
                <th> Author</th>
                <th> State</th>
                <th></th>
                {todos.map((todo) => <TodoItem users={users} projects={projects} todo={todo} deleteTodo={deleteTodo}/>)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}

export default TodoList;