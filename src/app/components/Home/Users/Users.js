import React, {Component} from 'react';
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import {getUserIDAuth} from "../../../services/authenticationManager";
import {getUserByID, getUsersExcept, updateUser} from "../../../backend/users_backend";
import SimpleUser from "./SimpleUser";
import Box from "../Boxes/Box";
import Searchbar from "../../Searchbar/Searchbar";

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: getUserIDAuth(),
            isFetching: true,
            users: [],
            usersSearched: [],
            searchValue: ""
        };
    }

    componentDidMount = () => {
        this.fetchData();
    };

    fetchData = () => {
        this.setState({isFetching: true});
        this.setState((prevState) => ({
            users: getUsersExcept(prevState.userID),
            usersSearched: getUsersExcept(prevState.userID)
        }), () => {
            this.setState({isFetching: false});
        });
    };

    modifyUser = (index, state) => {
        let users = this.state.usersSearched;
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

    convertUsersForSearchbar = (users) => {
        const usersForSearchbar = [];

        users.forEach((user) => {
            usersForSearchbar.push({
                id: user.id,
                value: user.first_name + " " + user.last_name
            })
        });

        return usersForSearchbar;
    };

    handleSearchResults = (searchValue, resultsID) => {
        const users = [];

        resultsID.forEach((resultID) => {
            users.push(getUserByID(resultID));
        });

        this.setState({
            usersSearched: users,
            searchValue: searchValue
        });
    };

    displayUsers = () => {
        return (
            <div className="container-in">
                <div id="boxesContainer">
                    <h3>List of users</h3>
                    {this.state.isFetching ? <p>Fetching data...</p> :
                        <div id="boxesList">
                            <Searchbar searchValue={this.state.searchValue} autoFocus={true}
                                       items={this.convertUsersForSearchbar(this.state.users)}
                                       searchResults={this.handleSearchResults}/>
                            {this.state.usersSearched.map((user, index) => (
                                <Box key={user.id} index={index} container={SimpleUser} data={user} modifON={false}
                                     removeON={false} switchON={true} switchLabel="Admin"
                                     onSwitch={this.handleSwitch} classNames="box box-hover"/>))}
                        </div>
                    }
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