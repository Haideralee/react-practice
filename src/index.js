import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store";
import '../src/index.css';
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import NewTask from "./components/NewTask.js";
import GetDataFromAPI from "./components/GetDataFromAPI.js";
import { bindFunction } from "./util";


class App extends React.Component{
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

    sendData(param){
        //console.log("this.props.location.pathname : ", this.props.location.pathname);
        //if(this.props.location.pathname === "/" || this.props.location.pathname === "/task-list"){
        if(param === "/" || param === "/task-list"){
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
                <Header />
                <div className="content-wrapper">
                    {/* React.cloneElement(this.props.children, this.sendData()) */}
                    <Switch>
                        <Route path="/task-list" render={(props) => {
                                return <Main
                                {...props}
                                tasks={this.state.tasks}
                                changeStatus={this.changeStatus}
                                removeTask={this.removeTask}
                                updateTask={this.updateTask}
                                />
                            }}/>
                        <Route path="/add-new-task" render={(props) => {
                                return <NewTask
                                {...props}
                                handleSubmit={this.updateTask}
                                />
                            }} />
                        <Route path="/update-task/:id" component={NewTask} />
                        <Route path="/get-data-from-api" component={GetDataFromAPI} />
                        <Redirect from="/" to="/task-list" />
                    </Switch>
                </div>
            </div>
        )
    }
}


//<IndexRoute component={Main} />
//
//render Router in dom and show initial component
ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById("root")
);

/*
 <Route component={Header}>
 <Redirect from="/" to="/task-list" />
 <Route path="task-list" component={Main} />
 <Route path="add-new-task" component={NewTask} />
 <Route path="update-task(/:id)" component={NewTask} />
 <Route path="get-data-from-api" component={GetDataFromAPI} />
 </Route>
 */