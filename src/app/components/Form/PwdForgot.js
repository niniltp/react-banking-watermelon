import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonToolbar } from 'reactstrap';
import { Link } from 'react-router-dom';

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
            
            <form>
                <h4>Enter your email address below :</h4>
                <br/>
                <div>
                    <h4><label>Email</label></h4>
                    <input type="text" onChange={this.handleChangeEmail} value={this.state.email} />
                </div>

                <br/>
                <ButtonToolbar>
                    <Button type="submit" color="primary" onClick={this.subscribe}>Submit</Button>
                </ButtonToolbar>
                <br/>

                <h6><Link to="/signUp">New to Watermelon ? Join now !</Link></h6>
            </form>

            </div>
           
            
        );
    }



}

export default PwdForgot;