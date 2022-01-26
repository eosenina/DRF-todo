import React from "react";
import App from "../App";
import {Link} from "react-router-dom";
import FilterProjectForm from "./FilterProjectForm";
import ProjectForm from "./ProjectForm";


const ProjectItem = ({users, project, deleteProject}) => {
    return (
        <tr>
            <td>
                <Link to={{pathname:`/project/${project.id}`}}> {project.name} </Link>
            </td>
            <td>{project.user.map((user_id) =>{ return users.find((user) => user.id == user_id).username })}</td>
            <td>{project.repo_link}</td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
            <td>
                <Link to={{pathname:`/projects/update/${project.id}`}}>Update</Link>
            </td>
        </tr>
    )
}
const ProjectList = ({users, projects, deleteProject}) => {

    return (
        <div>
            <table>
                <th> Project name</th>
                <th> User</th>
                <th> Link</th>
                <th></th>
                {projects.map((project) => <ProjectItem  users={users} project={project}
                                                        deleteProject={deleteProject}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>

        </div>
    )
}

const FilteredProjectList = ({users, projects, deleteProject, filterProject}) => {

    return (
        <div>
            <FilterProjectForm filterProject={(name) => filterProject(name)}/>
            <ProjectList users={users} projects={projects} deleteProject={deleteProject}/>
        </div>
    )
}

export default FilteredProjectList;