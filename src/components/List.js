import React from "react";

//list component with props
class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
        this.renderItem = this.renderItem.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.toggle = this.toggle.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    renderItem (){
        return (
            <li className={this.props.object.complete ? "complete": "not-complete"}>
                <span>{this.props.index} - </span>
                <strong>{this.props.object.task}</strong>
                <span>{this.props.object.complete ? " - Complete" : " - Not Complete"}</span>
                <button onClick={(e) => {
                        //e.stopPropagation();
                        this.props.clickHendler(this.props.index, e)
                    }
                }>
                    {this.props.object.complete ? "Not complete" : "Complete"}
                </button>
                <button onClick={(e) => {
                        //e.stopPropagation();
                        this.props.removeHendler(this.props.index, e)
                    }
                }> Delete </button>
                <button onClick={(e) => {
                        //e.stopPropagation();
                        this.toggle();
                    }
                }> Edit </button>
            </li>
        )
    };

    renderForm (){
        return (
            <form onSubmit={this.updateItem}>
                <input type="text" ref={(value) => this.input = value} defaultValue={this.props.object.task}/>
                <button type="submit">Update Item</button>
            </form>
        )
    };

    toggle (){
        const { editMode } = this.state;
        this.setState({editMode: !editMode})
    }

    updateItem (e){
        e.preventDefault();
        this.props.updateHendler(this.props.index, this.input.value);
        this.toggle();
    }

    render(){
        const { editMode } = this.state;
        return (
            <div> { editMode ? this.renderForm() : this.renderItem() } </div>
        )
    }
}

//set type of props
//isRequired is use for mandatory props with out this, react will generate error in console
List.propsTypes = {
    clickHendler: React.PropTypes.func.isRequired,
    object: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    removeHendler: React.PropTypes.func.isRequired,
    updateHendler: React.PropTypes.func.isRequired
};

export default List;