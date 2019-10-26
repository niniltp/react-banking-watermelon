import React, {Component} from 'react';
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import {getUserIDAuth} from "../../../services/authenticationManager";
import {getUsersExcept, updateUser} from "../../../backend/users_backend";
import SimpleUser from "./SimpleUser";
import Box from "../Boxes/Box";

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: getUserIDAuth(),
            isFetching: true,
            users: []
        };
    }

    componentDidMount = () => {
        this.fetchData();
    };

    fetchData = () => {
        this.setState({isFetching: true});
        this.setState((prevState) => ({
            users: getUsersExcept(prevState.userID),
        }), () => {
            this.setState({isFetching: false});
        });
    };

    modifyUser = (index, state) => {
        let users = this.state.users;
        let newUser = users[index];

        newUser = {
            ...newUser,
            is_admin: state
        };
        users[index] = newUser;
        this.setState({
            users: users
        });
        updateUser(newUser);
    };

    handleSwitch = (index, state) => {
        this.modifyUser(index, state);
    };

    displayUsers = () => {
        return (
            <div className="container-in">
                <div id="boxesContainer">
                    <h3>List of users</h3>
                    <div id="boxesList">
                        {this.state.isFetching ? <p>Fetching data...</p> : this.state.users.map((user, index) => (
                            <Box key={index} index={index} container={SimpleUser} data={user} modifON={false}
                                 removeON={false} switchON={true} switchLabel="Admin"
                                 onSwitch={this.handleSwitch} classNames="box box-hover"/>))}
                    </div>
                </div>
                <Link to="/account"><Button color="primary" className="boxForm-btn">Go back</Button></Link>
            </div>
        );
    };
    render = () => {
        return (
            this.displayUsers()
        );
    };
}

export default Users;