import React, {Component} from 'react';
import {getUserIDAuth} from "../../../services/authenticationManager";
import Parameters from "./Parameter";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import {getUserByID} from "../../../backend/users_backend";

//code written by CHEONG Loïc

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            parameters: [] //This array will contain objects with the name of the parameter and its value
        });
    }

    componentDidMount() {
        //console.log("You are in settings !");
        this.initParam();
    }

    addParam(elt, value) {
        //THis function adds a new parameter in the array parameters
        this.setState((prevState) => ({parameters: [...prevState.parameters, {name: elt, val: value}]}));
    }

    initParam() {
        /*This function initializes the array parameters
        with the user's data*/
        let array = [];
        const user = getUserByID(getUserIDAuth()); //it's an Object
        array.push(user);
        this.addParam("First name", array[0].first_name);
        this.addParam("Last name", array[0].last_name);
        this.addParam("Email", array[0].email);
        this.addParam("Password", array[0].password);
        //console.log(this.state.parameters);
    }


    render() {
        return (
            <div className="container-in">
                <br/>
                <h3>Profile</h3>
                {this.state.parameters.map((param, index) => (<Parameters key={index} index={index} param={param}/>))}
                <br/>
                <br/>
                <Link to="/account"><Button color="primary">Go back</Button></Link>
            </div>
        );
    }
}


export default Settings;