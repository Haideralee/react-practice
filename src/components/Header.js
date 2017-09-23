import React from "react";
import { NavLink } from 'react-router-dom';

import logo from '../logo.svg';
import StateLess from "./Title.js";
import { bindFunction } from "../util";

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "Welcome to React",
            tagLine: "You're in Future",
            tasks: [
                {task: "Task 0", desc:"Hello there, this is some text in a text area", complete: false},
                {task: "Task 1", desc:"Hello there, this is some text in a text area", complete: false},
                {task: "Task 2", desc:"Hello there, this is some text in a text area", complete: false},
                {task: "Task 3", desc:"Hello there, this is some text in a text area", complete: false},
                {task: "Task 4", desc:"Hello there, this is some text in a text area", complete: false}
            ]
        };
        //bind this ref on methods
        bindFunction(['changeStatus', 'removeTask', 'addTask', 'updateTask', 'sendData'], this);
        //this.changeStatus = this.changeStatus.bind(this);
        //this.removeTask = this.removeTask.bind(this);
        //this.addTask = this.addTask.bind(this);
        //this.updateTask = this.updateTask.bind(this);
        //this.sendData = this.sendData.bind(this);

        console.log("this.props : ", this.props);
    }

    changeStatus = (index) => {
        let holdTasks = this.state.tasks;
        let currentTask = holdTasks[index];
        currentTask.complete = !currentTask.complete;
        this.setState({tasks: holdTasks});
    };

    removeTask = (index, e) => {
        let holdTasks = this.state.tasks;
        holdTasks.splice(index, 1);
        this.setState({tasks: holdTasks});
    };

    addTask = (e, newTask) => {
        e.preventDefault();
        let holdTasks = this.state.tasks;
        //holdTasks.push(newTask); //this will make ref issue
        this.setState({tasks: holdTasks.concat(newTask)}); //concat return new array
    };

    updateTask = (e, index, object) => {
        e.preventDefault();
        let holdTasks = this.state.tasks;
        //let currentTask = holdTasks[index];
        //currentTask["task"] = updateValue;
        holdTasks[index] = object;
        this.setState({tasks: holdTasks});
    };

    sendData(){
        //console.log("this.props.location.pathname : ", this.props.location.pathname);
        if(this.props.location.pathname === "/" || this.props.location.pathname === "/task-list"){
            return {
                tasks: this.state.tasks,
                changeStatus: this.changeStatus,
                removeTask: this.removeTask,
                updateTask: this.updateTask
            }
        }
        else if(this.props.location.pathname === "/add-new-task"){
            return { handleSubmit: this.addTask }
        }

    }

    render(){
        return (
            <div className="app-wrapper">
                <div className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <StateLess title={this.state.title} tagLine={this.state.tagLine} />
                    <div className="nav-wrapper">
                        <ul>
                            <li><NavLink activeClassName="active" to="/task-list"> task list </NavLink></li>
                            <li><NavLink activeClassName="active" to="/add-new-task"> Add New Task </NavLink></li>
                            <li><NavLink activeClassName="active" to="/get-data-from-api"> Get Data From API </NavLink></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper">
                    {/* React.cloneElement(this.props.children, this.sendData()) */}
                </div>
            </div>
        )
    }
}

export default Header;