import React from "react";
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './index.css';
import List from "./components/List.js";
import StateLess from "./components/Title.js";

//APP component with passing state in other component.
class APP extends React.Component{
  constructor(){
    super();
    this.state = {
      title: "Welcome to React",
      tagLine: "You're in Future",
      tasks: [
        {task: "Task 0", complete: false},
        {task: "Task 1", complete: false},
        {task: "Task 2", complete: false},
        {task: "Task 3", complete: false},
        {task: "Task 4", complete: false}
      ]
    }
  }

  //App component's method
  changeStatus = (index) => {
    var holdTasks = this.state.tasks;
    var currentTask = holdTasks[index];
    currentTask.complete = !currentTask.complete;
    this.setState({tasks: holdTasks});
  }

  render(){
    return (
        <div className="app-wrapper">
          <div className="app-header">
            <img src={logo} className="app-logo" alt="logo" />
            <StateLess title={this.state.title} tagLine={this.state.tagLine} />
          </div>
          <div className="content-wrapper">
            <ul>
              {
                this.state.tasks.map((v, i) => {
                  return <List clickHendler={this.changeStatus} key={i} object={v} index={i} />
                })
              }
            </ul>
          </div>
        </div>
    )
  }
}

//render app in dom
ReactDOM.render(<APP />, document.getElementById("root"));