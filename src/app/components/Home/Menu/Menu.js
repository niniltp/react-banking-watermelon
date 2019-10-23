import  React, { Component } from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import './Menu.css';

class Menu extends Component {
    render() {
        return (
            <div id="menu">
                <Link to="/settings"><Button outline color="secondary" className="menuBtn">Settings</Button></Link>
                <Link to="/cards"><Button outline color="secondary" className="menuBtn">Credit Cards</Button></Link>
            </div>
        );
    }
}

export default Menu;