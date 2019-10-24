import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonToolbar } from 'reactstrap';
import { Link, Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {setDataInLS, getDataFromLS} from "../../services/localStorageManager.js";
import {getUsers} from "../../backend/users_backend";

//Code written by CHEONG Loïc 

class PwdForgot extends Component {
    constructor(props){
        super(props);
        this.state = { 
            email : '',
            errors : [],
            redirect: false
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        //this.checkField = this.checkField.bind(this);
        this.Submit=this.Submit.bind(this);
    }

    handleChangeEmail = event => {
        this.setState({ email : event.target.value });
    }

    MsgErr(elt,msg){
        /*This function will add error messages to the array errors  
        It will be use in the funciton Submit*/
        this.setState((lastState) => ({ errors : [...lastState.errors, {elt,msg} ]}));
    }

    Submit(){
        //this function checks if there is what it is expected in the fields
        //Otherwise, it will display a msg error
        
        //Step 1 : check if there are empty fiels
        this.setState({errors : [] }); //reinitiate the array errors
        console.log("Vous aviez appuyé sur le bouton signUp!");
        console.log(this.state.email);

        if (this.state.email === "") {
           this.MsgErr("Empty","You have not to fill in this field !");
        } else {
            this.MsgErr("wrongEmail","Wrong email or it is not in our database");
        }


        //Step 2 : is the user in the database ?
        const users = getUsers(); 
        const user = users.filter((user)=> {return user.email===this.state.email;});
        //console.log(user);
        if (user.length === 1 && user[0].email===this.state.email) {//the user has been found in the array users
            console.log("Email reconnu ! Vous allez procéder au changement de mot de passe");
            setDataInLS("userID",user[0].id);
            this.setState({redirect: true});
        } 
    }


    render() {

        if (this.state.redirect === true && getDataFromLS("userID") != null) return <Redirect to="changePwd"/>;

        else {

            //if (this.state.redirect === true && getDataFromLS("userID") != null) return <Redirect to="changePwd"/>;
            
            let  emailErr = null;
            for(let err of this.state.errors){
                if (err.elt === "Empty") emailErr = err.msg;
                if (err.elt === "wrongEmail") emailErr = err.msg;
            }

            return (
                <div className="home-container">
                
                <Form>
                    <h4>Enter your email address below :</h4>
                    <br/>
                    <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email" onChange={this.handleChangeEmail} value={this.state.email}/>
                            <p style={{fontSize:12, color: "red"}}>{emailErr ? emailErr : ""}</p>
                    </Form.Group>

                    <br/>
                    <ButtonToolbar>
                        <Button type="button" color="primary" onClick={this.Submit} block>Submit</Button>
                    </ButtonToolbar>
                    <br/>

                    <h6><Link to="/signUp">New to Watermelon ? Join now !</Link></h6>
                </Form>

                </div>
            
                
            );
        }
    }



}

export default PwdForgot;