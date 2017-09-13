import React from "react";
import $ from "jquery";

class GetDataFromAPI extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount(){
        $.ajax({
            url: 'https://jsonplaceholder.typicode.com/users',
            success: (res) => {
                console.log("res : ", res);
                this.setState({users: res});
            }
        })
    }

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

    render(){
        const { users } = this.state;
        return (
            <div>
                <h3> Fetch data from REST API </h3>
                {users.length ? this.userList() : <h5> Loading... </h5>}
            </div>
        )
    }
}

export default GetDataFromAPI;