import React from "react";
import { NavLink } from 'react-router-dom';

import logo from '../logo.svg';
import StateLess from "./Title.js";

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "Welcome to React",
            tagLine: "You're in Future"
        };
    }

    render(){
        return (
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
        )
    }
}

export default Header;


/*<div className="app-wrapper">
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
 { React.cloneElement(this.props.children, this.sendData()) }
 </div>
 </div>*/