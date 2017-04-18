import React from "react";

class NewTask extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }

    handleChange(event, val) {
        this.setState({value: event.target.value});
    }

    render(){
        return (
            <form className="form" onSubmit={(e) => {
                this.props.handleSubmit(e, {task: this.state.value, complete: false});
                this.setState({value: ""})
            }}>
                <label>
                    <input type="text" placeholder="Text..." value={this.state.value}
                           onChange={this.handleChange.bind(this)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

//set data type for props
NewTask.propsTypes = {
    handleSubmit: React.PropTypes.func.isRequired
};

export default NewTask;