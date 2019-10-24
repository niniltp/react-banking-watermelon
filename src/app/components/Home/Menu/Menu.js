import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import './Menu.css';
import {disconnectUser} from "../../../services/authenticationManager";

class Menu extends Component {
    handleResetDB = () => {
        localStorage.clear();
    };

    handleDisconnect = () => {
        disconnectUser();
    };

    render() {
        return (
            <div id="menu">
                <Link to="/settings"><Button outline color="primary" className="menuBtn">Settings</Button></Link>
                <Link to="/cards"><Button outline color="primary" className="menuBtn">Credit Cards</Button></Link>
                <Link to="/withdraw"><Button outline color="primary" className="menuBtn">Withdraw</Button></Link>
                <Link to="/deposit"><Button outline color="primary" className="menuBtn">Deposit</Button></Link>
                <Link to="/transfer"><Button outline color="primary" className="menuBtn">Transfer</Button></Link>
                <Link to="/"><Button outline color="danger" className="menuBtn" onClick={this.handleDisconnect}>Disconnect</Button></Link>
                <Link to="/"><Button outline color="danger" className="menuBtn" onClick={this.handleResetDB}>Reset
                    DB</Button></Link>
            </div>
        );
    }
}

export default Menu;