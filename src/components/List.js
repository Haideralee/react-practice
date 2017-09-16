import React from "react";
import { bindFunction } from "../util";
//list component with props
class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
        bindFunction(['renderItem', 'toggle'], this);
        //this.renderItem = this.renderItem.bind(this);
        //this.toggle = this.toggle.bind(this);
    }

    renderItem (){
        return (
            <li className={this.props.object.complete ? "complete": "not-complete"}>
                <span>{this.props.index} - </span>
                <strong>{this.props.object.task}</strong>
                <span>{this.props.object.complete ? " - Complete" : " - Not Complete"}</span>
                <button onClick={(e) => {
                        //e.stopPropagation();
                        this.toggle(this.props.index);
                    }
                }> Edit </button>
                <button onClick={(e) => {
                        //e.stopPropagation();
                        this.props.clickHendler(this.props.index, e)
                    }
                }>{this.props.object.complete ? "Not complete" : "Complete"}
                </button>
                <button onClick={(e) => {
                        //e.stopPropagation();
                        this.props.removeHendler(this.props.index, e)
                    }
                }> Delete </button>
            </li>
        )
    };

    toggle (index){
        const { router } = this.props;
        router.push({
            pathname: `/update-task/${index}`,
            state: {
                index: this.props.index,
                detail: this.props.object,
                handleSubmit: this.props.updateHendler
            }
        });

        //const { editMode } = this.state;
        //this.setState({editMode: !editMode})
    }

    render(){
        return (
            <div>
                { this.renderItem() }
            </div>
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