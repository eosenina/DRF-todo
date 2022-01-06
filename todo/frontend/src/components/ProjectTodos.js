import {useParams} from "react-router-dom";
import React from "react";
import TodoItem from "./TodoItem";


const ProjectTodosList = ({todos}) => {

    let {id} = useParams();
    console.log(id)
    let filtered_todos = todos.filter(todo => todo.project == id)
    return (
        <table>
            <th> Caption</th>
            <th> Text</th>
            <th> Project</th>
            <th> State</th>
            <th> Creation date</th>
            <th> Last update</th>
            <th> Author</th>
            {filtered_todos.map((todo) => <TodoItem todo={todo}/>)}
        </table>
    )

}

export default ProjectTodosList