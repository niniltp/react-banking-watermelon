import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import './Menu.css';
import {disconnectUser, isAdmin} from "../../../services/authenticationManager";
import {resetLS} from "../../../services/localStorageManager";

class Menu extends Component {
    handleResetDB = () => {
        if(isAdmin())
            resetLS();
    };

    handleDisconnect = () => {
        disconnectUser();
    };

    render() {
        return (
            <div id="menu">
                <Link to="/settings"><Button outline color="primary" className="menuBtn">Settings</Button></Link>
                {isAdmin() ? (<Link to="/addAdmin"><Button outline color="primary" className="menuBtn">Add an admin</Button></Link>) : null}
                {isAdmin() ? (<Link to="/users"><Button outline color="primary" className="menuBtn">Users</Button></Link>) : null}
                <Link to="/cards"><Button outline color="primary" className="menuBtn">Credit Cards</Button></Link>
                <Link to="/activity"><Button outline color="primary" className="menuBtn">My Activity</Button></Link>
                <Link to="/withdraw"><Button outline color="primary" className="menuBtn">Withdraw</Button></Link>
                <Link to="/deposit"><Button outline color="primary" className="menuBtn">Deposit</Button></Link>
                <Link to="/transfer"><Button outline color="primary" className="menuBtn">Transfer</Button></Link>
                <Link to="/"><Button outline color="danger" className="menuBtn" onClick={this.handleDisconnect}>Disconnect</Button></Link>
                {isAdmin() ? <Link to="/"><Button outline color="danger" className="menuBtn" onClick={this.handleResetDB}>Reset
                    DB</Button></Link> : null}
            </div>
        );
    }
}

export default Menu;