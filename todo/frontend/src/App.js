import logo from './logo.svg';
import './App.css';
import React from "react";
import axios from "axios";
import UserList from "./components/User";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import {HashRouter, Link, Route, Switch, Redirect} from "react-router-dom";
import ProjectList from "./components/Project";
import TodoList from "./components/TodoList";
import NotFound from "./components/NotFound";
import ProjectTodosList from "./components/ProjectTodos";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        };
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(
            response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/').then(
            response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos/').then(
            response => {
                const todos = response.data
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }
        ).catch(error => console.log(error))
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
                    </ul>

                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}/>}/>
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


