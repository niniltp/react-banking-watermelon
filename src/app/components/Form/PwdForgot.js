import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonToolbar } from 'reactstrap';
import { Link, Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';

//Code written by CHEONG Loïc

class PwdForgot extends Component {
    constructor(props){
        super(props);
        this.state = { 
            email : '',
            errors : [] };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.checkField = this.checkField.bind(this);
    }

    handleChangeEmail = event => {
        this.setState({ email : event.target.value });
    }

    MsgErr(elt,msg){
        /*This function will add error messages to the array errors  
        It will be use in the funciton checkFields*/
        this.setState((lastState) => ({ errors : [...lastState.errors, {elt,msg} ]}));
    }

    checkField(){
        //this function checks if there is what it is expected in the fields
        //Otherwise, it will display a msg error
        
        //Step 1 : check if there are empty fiels
        this.setState({errors : [] }); //reinitiate the array errors
        console.log("Vous aviez appuyé sur le bouton signUp!");
        console.log(this.state.email);

        if (this.state.email === "") {
           this.MsgErr("email","You have not to fill in this field !");
        }


        //Step 2 : is the user in the database ?
        const users = JSON.parse(localStorage.getItem("users"));
        const user = users.filter((user)=> {return user.email===this.state.email;});
        //console.log(user);
        if (user.length === 1 && user[0].email===this.state.email) {//the user has been found in the array users
            console.log("Email reconnu ! Vous allez procéder au changement de mot de passe");
            return (<Redirect to="/signUp"/>);
        }
        
    }


    render() {

        let  emailErr = null;
        for(let err of this.state.errors){
            if (err.elt === "email") emailErr = err.msg;
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
                    <Button type="button" color="primary" onClick={this.checkField} block>Submit</Button>
                </ButtonToolbar>
                <br/>

                <h6><Link to="/signUp">New to Watermelon ? Join now !</Link></h6>
            </Form>

            </div>
           
            
        );
    }



}

export default PwdForgot;