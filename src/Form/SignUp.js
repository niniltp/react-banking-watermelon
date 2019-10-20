import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar } from 'reactstrap';

class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            first_name : '',
            last_name : '',
            email : '',
            password : ''};
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

    

    render() {
        return (
            <form>
                <div className="home-container">
                <h4>Please fill in this form :</h4>
                <br/>
                <div>
                    <h4><label>Last-name</label></h4>
                    <input type="text" onChange={this.handleChangeLastName} value={this.state.last_name} />
                </div>
                <br/>
                <div>
                    <h4><label>First-name</label></h4>
                    <input type="text" onChange={this.handleChangeFirstName} value={this.state.first_name} />
                </div>
                <br/>
                <div>
                    <h4><label>Email</label></h4>
                    <input type="email" onChange={this.handleChangeEmail} value={this.state.email} />
                </div>
                <br/>
                <div>
                    <h4><label>Password</label></h4>
                    <input type="password" onChange={this.handleChangePassword} value={this.state.password} />
                </div>

                <br/><br/>
                <ButtonToolbar>
                <Button type="submit" color="primary" onClick={this.subscribe}>Sign Up</Button>
                </ButtonToolbar>
                <br/>
                <br/>
                <Link to="/"><h6>Already on Watermelon ? Sign in</h6></Link>
                </div>
                
            </form>
            
            
            
        );
    }
    
}

export default SignUp;
