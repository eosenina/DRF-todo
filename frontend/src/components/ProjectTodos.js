import {useParams} from "react-router-dom";
import React from "react";
import TodoItem from "./TodoItem";


const ProjectTodosList = ({users, projects, todos, deleteTodo}) => {

    let {id} = useParams();
    let filtered_todos = todos.filter(todo => todo.project == id)
    return (
        <table>
            <th> Caption</th>
            <th> Text</th>
            <th> Project</th>

            <th> Creation date</th>
            <th> Last update</th>
            <th> Author</th>
            <th> State</th>
            {filtered_todos.map((todo) => <TodoItem  users={users} projects={projects} todo={todo} deleteTodo={deleteTodo}/>)}
        </table>
    )

}

export default ProjectTodosList