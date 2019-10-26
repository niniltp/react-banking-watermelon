import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom';
import { Button, ButtonToolbar} from 'reactstrap';
import Form from 'react-bootstrap/Form';
import {getUsers, addUser} from "../../backend/users_backend";
import {authenticateUser, isAuth} from "../../services/authenticationManager";
import {getWallets, addWallet} from "../../backend/wallets_backend.js";

//Code written by CHEONG Loïc

class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            first_name : '',
            last_name : '',
            email : '',
            password : '',
            errors : [],
            redirect : false
        };  
            
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.signUp= this.signUp.bind(this); 
    }

    handleChangeFirstName = event => {
        this.setState({ first_name : event.target.value });
        
    }

    handleChangeLastName = event => {
        this.setState({ last_name : event.target.value });
    }

    handleChangeEmail = event => {
        this.setState({ email : event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    subscribe = () =>{
    //this function records new user's data in the Watermelon database
        const users = getUsers(); //JSON.parse(localStorage.getItem("users"));
        const newUser = {
            id: users[users.length-1].id+1,
            first_name: this.state.first_name,
            last_name: this.state.last_name, 
            email: this.state.email, 
            password: this.state.password, 
            is_admin: false
        };

        const wallets = getWallets();
        const newWallet = {
                id: wallets[wallets.length-1].id+1,
                user_id: newUser.id,
                balance: 0
        };

        authenticateUser(newUser);
        addWallet(newWallet);
        //console.log(newUser);
        console.log(newWallet);
        return newUser;
    }

    MsgErr(elt,msg){
        /*This function will add error messages to the array errors  
        It will be use in the funciton signUp*/
        this.setState((lastState) => ({ errors : [...lastState.errors, {elt,msg} ]}));
    }


    signUp(){
        //this function checks if there is what it is expected in the fields
        //Otherwise, it will display a msg error
        this.setState({errors : [] });
        const users = getUsers(); //JSON.parse(localStorage.getItem("users"));
        const user = users.filter((user)=> {return user.email===this.state.email;});
        let condition = 0;

       if (this.state.last_name === "") {
           this.MsgErr("lastName","You have not to fill in this field !");
           condition++;
        }
        if (this.state.first_name === "") {
           this.MsgErr("firstName","You have not to fill in this field !");
           condition++;
        }
        if (this.state.password === "") {
           this.MsgErr("password","You have not to fill in this field !");
           condition++;
        } else if (this.state.password.length < 8) {
            this.MsgErr("password","Your password need to be longer !");
            condition++;
        }

        if (user.length === 1 && user[0].email===this.state.email) {//the user has been found in the array users
            this.MsgErr("email","There is already an user under this email address !");
            condition++;
        } else if (this.state.email === "") {
            this.MsgErr("email","You have not to fill in this field !");
            condition++;
        }

        
        if (condition === 0){// condition = 0 means that there is not any error
            //let newArray = users.concat(this.subscribe());
            //console.log(newArray);
            //localStorage.setItem("users",JSON.stringify(newArray));
            console.log("Successful registration !");
            let newUser = this.subscribe();
            console.log(newUser);
            addUser(newUser);
            console.log(getUsers());
            this.setState({redirect: true});
           
        } 
        
    }



    render() {

        if(this.state.redirect || isAuth()) return <Redirect to='/account'/>; //TODO: change with function

        else {
            let  lastNameErr = null, firstNameErr = null, emailErr = null, passwordErr = null;

            for(let err of this.state.errors){
                if (err.elt === "lastName") lastNameErr = err.msg;
                if (err.elt === "firstName") firstNameErr = err.msg;
                if (err.elt === "email") emailErr = err.msg;
                if (err.elt === "password") passwordErr = err.msg;
            }

            return (
                <Form>
                    <div className="home-container">
                        <h4>Please fill in this form :</h4>
                        <br/>
                        <Form.Group>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Last name"  onChange={this.handleChangeLastName} value={this.state.last_name} />
                        <p style={{fontSize:12, color: "red"}}>{lastNameErr ? lastNameErr : ""}</p>
                        </Form.Group>
                        

                        <Form.Group>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name"  onChange={this.handleChangeFirstName} value={this.state.first_name}/>
                        <p style={{fontSize:12, color: "red"}}>{firstNameErr ? firstNameErr : ""}</p>
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={this.handleChangeEmail.bind(this)} value={this.state.email}/>
                            <p style={{fontSize:12, color: "red"}}>{emailErr ? emailErr : ""}</p>
                        </Form.Group>
                        
                    
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password (8 or more characters)" onChange={this.handleChangePassword} value={this.state.password}/>
                            <p style={{fontSize:12, color: "red"}}>{passwordErr ? passwordErr : ""}</p>
                        </Form.Group>
                        
                        
                        <br/>
                        <p style={{fontSize:12, color: "grey"}}>By clicking Sign Up, you agree to the Watermelon</p>
                        <p style={{fontSize:12, color: "grey"}}>User Agreement, Privacy Policy, and Cookie Policy</p>
                        <ButtonToolbar>
                        <Button type="button" color="primary" onClick={this.signUp} block>Sign Up</Button>
                        </ButtonToolbar>
                        <br/>
                        <br/>
                        <Link to="/"><h6>Already on Watermelon ? Sign in</h6></Link>
                    </div>
                    
                </Form>
                
                
                
            );
        }
    }
    
}

export default SignUp;
