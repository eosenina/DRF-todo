import React from 'react'


class ProjectUpdateForm extends React.Component {
    constructor(props) {
        super(props)
        const selected_project = props.projects.filter((project) => project.id == props.id.match.params.id)
        this.state = {
            id: selected_project[0].id,
            name: selected_project[0].name,
            user: selected_project[0].user,
            repo_link: selected_project[0].repo_link
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleProjectChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({'user': []})
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({'user': users})
    }

    handleSubmit(event) {
        this.props.updateProject(this.state.name, this.state.user, this.state.repo_link, this.state.id)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="login">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="user">user</label>
                    <select name="user" multiple onChange={(event) => this.handleProjectChange(event)}>
                        {this.props.users.map((item) =>
                            <option value={item.id} selected={this.state.user.includes(item.id)}>{item.username}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="repo_link">link</label>
                    <input type="text" className="form-control" name="repo_link" value={this.state.repo_link}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type="submit" value="Save"/>
            </form>
        );
    }
}

export default ProjectUpdateForm