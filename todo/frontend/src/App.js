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
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}/>}/>
                        <Route exact path='/login' component={() => <LoginForm get_auth_data={(username, password) =>
                            this.get_auth_data(username, password)}/>}/>
                        <Route path='/project/:id'>
                            <ProjectTodosList todos={this.state.todos}/>
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


