import React from "react";
import App from "../App";
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`/project/${project.id}`}> {project.name} </Link>
            </td>
            <td>{ project.user }</td>
            <td>{ project.repo_link }</td>
        </tr>
    )
}
const ProjectList = ({projects}) => {

    return (
        <table>
            <th> Project name </th>
            <th> User </th>
            <th> Link </th>
            {projects.map((project) => <ProjectItem project = {project} />)}
        </table>
    )
}

export default ProjectList;