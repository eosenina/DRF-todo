import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            caption: '',
             author: props.users[0].id,
            text: '',
            project: props.projects[0].id,
        }
    }

    handleChange(event) {
        console.log('change', event.target.name, event.target.value)
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createTodo(this.state.caption, this.state.text, this.state.author, this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="caption">caption</label>
                    <input type="text" className="form-control" name="caption" value={this.state.caption}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="text">text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="author">author</label>
                    <select name="author" onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="project">project</label>
                    <select name="project" onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>


                <input type="submit" value="Save"/>
            </form>
        );
    }
}

export default TodoForm