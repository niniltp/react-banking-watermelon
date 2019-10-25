import React, {Component} from 'react';
import {getUserIDAuth} from "../../../services/authenticationManager";
import {getUserById} from "../../../backend/users_backend";
import Parameters from "./Parameter";

//code written by CHEONG Loïc

class Settings extends Component {

    constructor(props){
        super(props);
            this.state = ({
            parameters : []
        });
    }

    componentDidMount(){
        //to delete at the end or maybe not ...
        console.log("You are in settings !");
        this.initParam();
    }

    addParam(elt,value,msgError,isChanging){
        this.setState((prevState) => ({ parameters : [...prevState.parameters, {name : elt, val : value}]}));
    }
    
    initParam(){
        /*This function initializes the array parameters
        with the user's data*/
        let array = [];
        const user = getUserById(getUserIDAuth()); //it's an Object
        array.push(user);
        this.addParam("First name",array[0].first_name);
        this.addParam("Last name",array[0].last_name);
        this.addParam("Email",array[0].email);
        this.addParam("Password",array[0].password);  
        //console.log(this.state.parameters);
    }
    

    render(){
        return (
            <div className="container-in">
                <br/>
                <h3>Profile</h3>
                {
                    this.state.parameters.map((param,index)=>(<Parameters key={index} index={index} param={param} />))
                }
            </div>
        );
    }
}


export default Settings;