import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonToolbar } from 'reactstrap';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

//Code written by CHEONG Loïc

class PwdForgot extends Component {
    constructor(props){
        super(props);
        this.state = { email : ''}
    }

    handleChangeEmail = event => {
        this.setState({ email : event.target.value });
    }

    render() {
        return (
            
            <div className="home-container">
            
            <Form>
                <h4>Enter your email address below :</h4>
                <br/>
                <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Email" onChange={this.handleChangeEmail} value={this.state.email}/>
                </Form.Group>

                <br/>
                <ButtonToolbar>
                    <Button type="submit" color="primary" onClick={this.subscribe} block>Submit</Button>
                </ButtonToolbar>
                <br/>

                <h6><Link to="/signUp">New to Watermelon ? Join now !</Link></h6>
            </Form>

            </div>
           
            
        );
    }



}

export default PwdForgot;