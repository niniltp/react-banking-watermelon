import  React, { Component } from 'react';
import {Button} from 'reactstrap';
import {Route, Link} from "react-router-dom";
import './Menu.css';

class Menu extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="menu">
                <Button outline color="secondary" className="menuBtn"><Link to="/account">Account</Link></Button>
                <Button outline color="secondary" className="menuBtn"><Link to="/cards">Credit Cards</Link></Button>
            </div>
        );
    }
}

export default Menu;