import React from 'react'
import ProjectList from "./Project";


class FilterProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.filterProject(this.state.name)
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input type="text" className="form-control" name="name" value={this.state.name}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <input type="submit" value="Filter"/>
                </form>
                {/*<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>*/}
            </div>
        );
    }
}

export default FilterProjectForm