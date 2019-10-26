import React, {Component} from 'react';
import {Button, ButtonToolbar} from 'reactstrap';
import watermelon from './watermelon.png';
import {Redirect, Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {getUsers} from "../../backend/users_backend";
import {authenticateUser, isAuth} from "../../services/authenticationManager";

//Code written by CHEONG Loïc

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: [],
            redirect: false
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    MsgErr(elt, msg) {
        /*This function will add error messages to the array errors
        It will be use in the funciton checkForm*/
        this.setState((lastState) => ({errors: [...lastState.errors, {elt, msg}]}));
    }


    checkForm = () => {
        //this function checks if there is what it is expected in the fields
        //Otherwise, it will display a msg error

        //Step 1 : check if there are empty fiels
        this.setState({errors: []}); //reinitiate the array errors
        let condition = 0; //In order to that the user logs in to its page, it should no be any empty field

        if (this.state.email === "") {
            this.MsgErr("email", "You have not to fill in this field !");
            condition++;
        }
        if (this.state.password === "") {
            this.MsgErr("password", "You have not to fill in this field !");
            condition++;
        }


        //Step 2 : is the user in the database ?
        console.log("Vous aviez appuyé sur le bouton connexion !");
        console.log(this.state.email + " " + this.state.password);
        const users = getUsers(); //JSON.parse(localStorage.getItem("users"));
        const user = users.filter((user) => {
            return user.email === this.state.email;
        });
        //console.log(user);

        if (user.length === 1) {//the user has been found in the array users
            if (user[0].email === this.state.email && user[0].password === this.state.password) {
                authenticateUser(user[0]);
                // localStorage.setItem("isAuth", true);
                // localStorage.setItem("userID", user[0].id);
                console.log("Vous vous êtes bien connecté !");
                console.log(user[0].first_name + " " + user[0].last_name);
            } else {//the user found but wrong password
                console.log("Connexion échoué ! Vous ne vous êtes pas connecté !");
                this.MsgErr("wrongUser", "There is an error somewhere");
                condition++;
            }
        } else { //user not found in the array users
            this.MsgErr("wrongUser", "There is an error somewhere");
            condition++;
        }

        return condition === 0 ? true : false;
        // condition = 0 means that there is not any error
    };

    signIn() {
        if(this.checkForm()) {
            this.setState({redirect: true});
        }
    }

    render() {
        let emailErr = null, passwordErr = null, wrongUserErr;

        for (let err of this.state.errors) {
            if (err.elt === "email") emailErr = err.msg;
            if (err.elt === "password") passwordErr = err.msg;
            if (err.elt === "wrongUser") wrongUserErr = err.msg;
        }

        if(this.state.redirect || isAuth()) return <Redirect to='/account'/>; //TODO: change with function
        return (

            <Form>
                <div className="home-container">
                    <img src={watermelon} className="App-logo" alt="logo"/>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email" onChange={this.handleChangeEmail}
                                      value={this.state.email}/>
                        <p style={{fontSize: 12, color: "red"}}>{emailErr ? emailErr : ""}</p>
                    </Form.Group>

                    <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.handleChangePassword}
                                      value={this.state.password}/>
                        <p style={{fontSize: 12, color: "red"}}>{passwordErr ? passwordErr : ""}</p>
                    </Form.Group>
                    <br/>
                    <p style={{fontSize: 12, color: "red"}}>{wrongUserErr ? wrongUserErr : ""}</p>
                    <ButtonToolbar>
                        <Button type="button" color="primary" onClick={this.signIn} block>Sign in</Button>
                    </ButtonToolbar>

                    <br/>
                    <h6><Link to="/signUp">New to Watermelon ? Join now !</Link></h6>
                    <br/>
                    <h6><Link to="/pwdForgot">Forgot password ?</Link></h6>
                </div>
            </Form>

        );
    }


}

export default SignIn;