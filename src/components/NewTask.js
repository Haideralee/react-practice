import React from "react";
import { bindFunction } from "../util";
class NewTask extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isModifiedState: props.location.state || false,
            task: (props.location.state && props.location.state.detail.task) || "",
            desc: (props.location.state && props.location.state.detail.desc) || "",
            complete: (props.location.state && props.location.state.detail.complete) || false,
            addTaskMsg: false,
            updateTaskMsg: false
        };

        bindFunction(['handleChange', 'resetState', 'showMsg', 'checkboxChange'], this);
        //this.handleChange = this.handleChange.bind(this);
        //this.resetState = this.resetState.bind(this);
        //this.showMsg = this.showMsg.bind(this);
        //this.checkboxChange = this.checkboxChange.bind(this);
        console.log("props : ", props);
    }

    handleChange(stateName, event) {
        this.setState({[stateName]: event.target.value});
    }

    resetState(){
        if(this.state.isModifiedState) this.setState({value: "", updateTaskMsg: true});
        else this.setState({value: "", addTaskMsg: true});
        setTimeout(() => {
            this.setState({
                updateTaskMsg: false,
                addTaskMsg: false
            });
            this.props.router.push({ pathname: `/task-list` });
        }, 1000)
    }

    showMsg(){
        const { addTaskMsg, updateTaskMsg } = this.state;
        if (addTaskMsg) return(<text> Task is add in the list </text>);
        else if(updateTaskMsg) return(<text> Task is update in the list </text>);
    }

    checkboxChange(e){
        const { complete } = this.state;
        //console.log("e.target.checked ", e.target.checked);
        this.setState({complete: !complete});
    }

    render(){
        //console.log("render new and update task this.props : ", this.props);
        const { task, desc, complete, isModifiedState } = this.state;
        return (
            <form className="form" onSubmit={(e) => {
                const args = {
                        task: this.state.task,
                        desc: this.state.desc,
                        complete: this.state.complete
                };
                if(isModifiedState && isModifiedState.handleSubmit) isModifiedState.handleSubmit(e, isModifiedState.index, args);
                else this.props.handleSubmit(e, args);
                this.resetState();
            }}>
                <label>
                    <input type="text" placeholder="Text..." value={task}
                           onChange={this.handleChange.bind(this, 'task' )} />
                </label>
                <label>
                    <textarea value={desc} onChange={this.handleChange.bind(this, 'desc')} > </textarea>
                </label>
                <label>

                    <input type="checkbox" defaultChecked={complete} onChange={this.checkboxChange} />
                    <text> check for complete </text>
                </label>
                <input type="submit" value="Submit" />
                { this.showMsg() }
            </form>
        )
    }
}

//set data type for props
NewTask.propsTypes = {
    handleSubmit: React.PropTypes.func.isRequired
};

export default NewTask;