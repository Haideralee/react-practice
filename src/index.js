import React from "react";
import ReactDOM from "react-dom";
import logo from './logo.svg';
import './index.css';
import List from "./components/List.js";
import StateLess from "./components/Title.js";
import NewTask from "./components/NewTask.js";
import $ from "jquery";

//APP component with passing state in other component.
class APP extends React.Component{
  constructor(){
    super();
    this.state = {
      title: "Welcome to React",
      tagLine: "You're in Future",
      users: [],
      tasks: [
        {task: "Task 0", complete: false},
        {task: "Task 1", complete: false},
        {task: "Task 2", complete: false},
        {task: "Task 3", complete: false},
        {task: "Task 4", complete: false}
      ]
    };
  }

  //App component's method
  changeStatus = (index) => {
    var holdTasks = this.state.tasks;
    var currentTask = holdTasks[index];
    currentTask.complete = !currentTask.complete;
    this.setState({tasks: holdTasks});
  };

  removeTask = (index, e) => {
    var holdTasks = this.state.tasks;
    holdTasks.splice(index, 1);
    this.setState({tasks: holdTasks});
  };

  addTask = (e, newTask) => {
    console.log("newTask : ", newTask);
    e.preventDefault();
    var holdTasks = this.state.tasks;
    //holdTasks.push(newTask);
    this.setState({tasks: holdTasks.concat(newTask)});
  };

  updateTask = (index, updateValue) => {
    var holdTasks = this.state.tasks;
    var currentTask = holdTasks[index];
    currentTask["task"] = updateValue;
    this.setState({tasks: holdTasks});
  };

  userList = () => {
    return (
        <ul>
          {
              this.state.users.map( (v, i) => {
                return (
                    <li key={v.id}>
                      {i + " - " + v.name}
                    </li>
                )
              })
          }
        </ul>
    )
  };

  componentDidMount(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/users',
      success: (res) => {
        console.log("res : ", res);
        this.setState({users: res});
      }
    })
  }

  render(){
    const { users } = this.state;
    return (
        <div className="app-wrapper">
          <div className="app-header">
            <img src={logo} className="app-logo" alt="logo" />
            <StateLess title={this.state.title} tagLine={this.state.tagLine} />
          </div>
          <div className="content-wrapper">
            <NewTask handleSubmit={this.addTask} />
            <ul>
              {
                this.state.tasks.map((v, i) => {
                  return <List
                        clickHendler={this.changeStatus}
                        key={i} object={v} index={i}
                        removeHendler={this.removeTask}
                        updateHendler={this.updateTask}
                      />
                })
              }
            </ul>
            <hr />
            <h3> Fetch data from REST API </h3>
            {users.length ? this.userList() : <h5> Loading... </h5>}
          </div>
        </div>
    )
  }
}

//render app in dom
ReactDOM.render(<APP />, document.getElementById("root"));