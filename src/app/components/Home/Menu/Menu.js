import  React, { Component } from 'react';
import {Button} from 'reactstrap';
import {Link} from "react-router-dom";
import './Menu.css';

class Menu extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="menu">
                <Link to="/account"><Button outline color="secondary" className="menuBtn">Account</Button></Link>
                <Link to="/cards"><Button outline color="secondary" className="menuBtn">Credit Cards</Button></Link>
            </div>
        );
    }
}

export default Menu;