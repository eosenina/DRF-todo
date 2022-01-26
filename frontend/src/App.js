import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import UserList from "./components/User";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import {HashRouter, Link, Route, Switch, Redirect} from "react-router-dom";
import ProjectList from "./components/Project";
import TodoList from "./components/TodoList";
import NotFound from "./components/NotFound";
import ProjectTodosList from "./components/ProjectTodos";
import LoginForm from "./components/LoginForm";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";
import FilterProjectForm from "./components/FilterProjectForm";
import FilteredProjectList from "./components/Project";
import ProjectUpdateForm from "./components/ProjectUpdateForm";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'user_name': ''
        };
    }

    set_auth_data(token, user_name) {
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('user_name', user_name)
        this.setState({'token': token, 'user_name': user_name}, () => this.load_data())
    }

    is_auth(token) {
        return !!this.state.token
    }

    logout() {
        this.set_auth_data('', '')
    }

    get_auth_data_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const user_name = cookies.get('user_name')
        this.setState({'token': token, 'user_name': user_name}, () => this.load_data())
    }

    get_auth_data(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password}).then(
            response => {
                this.set_auth_data(response.data['token'], username)
                // console.log(response.data)
            }
        ).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    componentDidMount() {
        this.get_auth_data_from_storage()
        // this.load_data()
    }

    createProject(name, user, repo_link) {
        const headers = this.get_headers()
        const data = {name: name, user: user, repo_link: repo_link}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => {
                alert('Ошибка! Не удалось создать проект.')
                console.log(error)
        })
    }

    filterProject(name) {
        // let result=[];
        // this.state.projects.forEach( i => {
        //     if (i.name.indexOf(name) !== -1)
        //         result.push(i)
        // })
        // this.setState({'projects': result})

        const headers = this.get_headers()
        axios.get(`http://127.0.0.1:8000/api/projects/?name=${name}`, {headers})
            .then(response => {
                this.setState({'projects': response.data})
            }).catch(error => console.log(error))
    }

    updateProject(name, user, repo_link, id) {
        const headers = this.get_headers()
        const data = {name: name, user: user, repo_link: repo_link}
        axios.put(`http://127.0.0.1:8000/api/projects/${id}/`, data, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => {
                alert('Ошибка! Не удалось обновить проект.')
                console.log(error)
        })
    }

    createTodo(caption, text, author, project) {
        const headers = this.get_headers()
        const data = {caption: caption, text: text, author: author, project: project}
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => {
                alert('Ошибка! Не удалось создать задачу.')
                console.log(error)
        })
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
                alert('Ошибка! Не удалось удалить проект.')
                console.log(error)
            }
        )
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            alert('Ошибка! Не удалось удалить задачу.')
            console.log(error)
        })
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(
            response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }
        ).catch(error => {
            console.log(error)
            this.setState({users: []})
        })

        axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then(
            response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }
        ).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })

        axios.get('http://127.0.0.1:8000/api/todos/', {headers}).then(
            response => {
                const todos = response.data
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }
        ).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <ul>
                        <li>
                            <Link to='/'>Пользователи</Link>
                        </li>
                        <li>
                            <Link to='/projects'>Проекты</Link>
                        </li>
                        <li>
                            <Link to='/todos'>Задачи</Link>
                        </li>
                        <li>
                            {this.is_auth() ? <p>{this.state.user_name}
                                    <button onClick={() => this.logout()}>Выход</button>
                                </p> :
                                <Link to='/login'>Вход</Link>}
                        </li>
                    </ul>

                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects/create' component={() =>
                            <ProjectForm users={this.state.users}
                                         createProject={(name, user, repo_link) => this.createProject(name, user, repo_link)}/>}/>
                        <Route exact path='/projects/update/:id'
                               component={(id) =>
                                   <ProjectUpdateForm users={this.state.users} projects={this.state.projects} id={id}
                                                      updateProject={(name, user, repo_link, id) => this.updateProject(name, user, repo_link, id)}/>}/>
                        <Route exact path='/projects' component={() =>
                            <FilteredProjectList users={this.state.users}
                                                 projects={this.state.projects}
                                                 deleteProject={(id) => this.deleteProject(id)}
                                                 filterProject={(name) => this.filterProject(name)}/>
                        }/>
                        <Route exact path='/todos/create' component={() =>
                            <TodoForm users={this.state.users} projects={this.state.projects}
                                      createTodo={(caption, text, author, project) => this.createTodo(caption, text, author, project)}/>}/>
                        <Route exact path='/todos' component={() => <TodoList
                            users={this.state.users}
                            projects={this.state.projects}
                            todos={this.state.todos}
                            deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                        <Route exact path='/login' component={() => <LoginForm get_auth_data={(username, password) =>
                            this.get_auth_data(username, password)}/>}/>
                        <Route path='/project/:id'>
                            <ProjectTodosList users={this.state.users}
                                              projects={this.state.projects}
                                              todos={this.state.todos}
                                              deleteTodo={(id) => this.deleteTodo(id)}/>
                        </Route>
                        <Redirect to='/' from='/users'/>


                        <Route component={NotFound}/>

                    </Switch>

                </HashRouter>

                <Footer/>
            </div>
        );
    }
}

export default App;


