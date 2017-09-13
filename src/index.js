import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory, Redirect } from 'react-router';
//import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import '../src/index.css';
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import NewTask from "./components/NewTask.js";
import GetDataFromAPI from "./components/GetDataFromAPI.js";

//<IndexRoute component={Main} />

//render Router in dom and show initial component
ReactDOM.render(
    <Router history={browserHistory}>
        <Redirect from="/" to="/task-list" />
        <Route path="/" component={Header}>
            <Route path="task-list" component={Main} />
            <Route path="add-new-task" component={NewTask} />
            <Route path="update-task(/:id)" component={NewTask} />
            <Route path="get-data-from-api" component={GetDataFromAPI} />
        </Route>
    </Router>
    ,
    document.getElementById("root")
);
