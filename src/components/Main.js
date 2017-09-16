import React from "react";

//import '../index.js';
import List from "./List.js";
import { bindFunction } from "../util";

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: "",
            tasks: props.tasks
        };

        bindFunction(['renderForm', 'handleChange'], this);
        //this.renderForm = this.renderForm.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }

    renderForm (){
        const { searchText } = this.state;
        return (
            <div className="search-input">
                <input type="text"
                       placeholder="search task..."
                       value={searchText}
                       onChange={this.handleChange.bind(this, 'searchText' )} />
            </div>
        )
    };

    handleChange(stateName, event) {
        let { tasks } = this.props;
        let searchText = event.target.value.toLowerCase();
        let searchTask;
        if(searchText.length) searchTask = tasks.filter( (obj) => obj.task.toLowerCase().search(searchText) >= 0 );
        else searchTask = this.props.tasks;
        this.setState({ [stateName]: event.target.value, tasks: searchTask });
    }

    render(){
        return (
            <div className="app-wrapper">
                <div className="content-wrapper">
                    { this.renderForm() }
                    <ul>
                        { (this.state.tasks.length) ?
                            this.state.tasks.map((v, i) => {
                                return <List
                                    router={this.props.router}
                                    clickHendler={this.props.changeStatus}
                                    key={i} object={v} index={i}
                                    removeHendler={this.props.removeTask}
                                    updateHendler={this.props.updateTask}
                                    />
                            })
                            : <text> ! No Such Task In The List. </text>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Main;