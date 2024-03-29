import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonToolbar } from 'reactstrap';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {getDataFromLS} from "../../services/localStorageManager.js";
import {getUsers, updateUser} from "../../backend/users_backend";

//Code written by CHEONG Loïc 

class changePwd extends Component{

    constructor(props){
        super(props);
        this.state = { 
            pwd1 : '',
            pwd2 : '',
            errors : [],
            redirect: false
         };
        this.handleChangePwd1 = this.handleChangePwd1.bind(this);
        this.handleChangePwd2 = this.handleChangePwd2.bind(this);
        this.checkField = this.checkField.bind(this);
    }

    handleChangePwd1(event) {
        this.setState({pwd1: event.target.value});
    }

    handleChangePwd2(event) {
        this.setState({pwd2: event.target.value});
    }


    MsgErr(elt, msg) {
        /*This function will add error messages to the array errors
        It will be use in the funciton checkField*/
        this.setState((lastState) => ({errors: [...lastState.errors, {elt, msg}]}));
    }

    checkField(){
        //this function checks if there is what it is expected in the fields
        //Otherwise, it will display a msg error
        
        this.setState({errors : [] }); //reinitiate the array errors
        //console.log(this.state.email);

        if (this.state.pwd1 === this.state.pwd2 && this.state.pwd1=== "" ) {
           this.MsgErr("Empty","You have to fill in this field !"); 
        }
        if (this.state.pwd1 !==  this.state.pwd2){
            this.MsgErr("NotSamePwd","Your password is not the same in these two fields !");
        }
        if ((this.state.pwd1 ===  this.state.pwd2) && this.state.pwd1.length<8 && this.state.pwd1 !== "") {
            this.MsgErr("PwdLength","Your password is too short !");
        }
        if ((this.state.pwd1 ===  this.state.pwd2) && this.state.pwd1.length>=8 ) {
            //console.log("Your password has been changed successfully !");
            this.setState({redirect: true});
            this.updatePwd();
        }
        
    }

    updatePwd = () =>{
        //this function records new user's data in the Watermelon database
        const users = getUsers();
       const user_ID = getDataFromLS("userID");
        const index = users.findIndex((user) => user.id === user_ID);
        //console.log(index);
        const userUpdated = {
           id: user_ID,
            first_name: users[index].first_name,
            last_name: users[index].last_name, 
            email: users[index].email, 
            password: this.state.pwd1, 
            is_admin: users[index].is_admin
        };
        //console.log(userUpdated);
        updateUser(userUpdated);
        //console.log(getUsers("users"));
    }



    render(){
        if (getDataFromLS("userID") === null) return <h1>ERROR 404 PAGE NOT FOUND</h1>;

        else {
            if(this.state.redirect) return (
                <div>
                    <br/>
                    <h1>Your password has been changed successfully !</h1> 
                    <br/>
                    <h6><Link to="/">Go to the login page</Link></h6>
                </div>
            );

            let passwordErr = null;

            for (let err of this.state.errors) {
                if (err.elt === "Empty") passwordErr = err.msg;
                if (err.elt === "NotSamePwd") passwordErr = err.msg;
                if (err.elt === "PwdLength") passwordErr = err.msg;
            }

            return (
                <div className="home-container">
                <Form>
                    <h4>Choose a password :</h4>
                    <br/>
                    <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password (8 or more characters)" onChange={this.handleChangePwd1} value={this.state.pwd1}/>
                            <p style={{fontSize: 12, color: "red"}}>{passwordErr ? passwordErr : ""}</p>
                    </Form.Group>
                    
                    <Form.Group controlId="formGroupPassword">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm password" onChange={this.handleChangePwd2} value={this.state.pwd2}/>
                            <p style={{fontSize: 12, color: "red"}}>{passwordErr ? passwordErr : ""}</p>
                    </Form.Group>

                    <br/>
                    <ButtonToolbar>
                        <Button type="button" color="primary" onClick={this.checkField} block>Submit</Button>
                    </ButtonToolbar>
                    <br/>

                    <h6><Link to="/signUp">New to Watermelon ? Join now !</Link></h6>
                    <br/>
                    <h6><Link to="/">I remember my password</Link></h6>
                </Form>

                </div>
            );
       }
    }




}

export default changePwd;