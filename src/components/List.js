import React from "react";

//list component with props
class List extends React.Component{
    render(){
        return (
            <li className={this.props.object.complete ? "complete": "not-complete"}
                onClick={() => this.props.clickHendler(this.props.index)}>
                <span>{this.props.index} - </span>
                <strong>{this.props.object.task}</strong>
                <span>{this.props.object.complete ? " - Complete": " - Not Complete"}</span>
            </li>
        )
    }
}

export default List;