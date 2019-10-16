import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import users from '../data/users';

class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            first_name : '',
            last_name : '',
            email : ''
        }
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

    

    render() {
        return (
            <form>
                <div>
                    <h3><label>Last-name</label></h3>
                    <input type="text" onChange={this.handleChangeLastName} value={this.state.last_name} />
                </div>

                <div>
                    <h3><label>First-name</label></h3>
                    <input type="text" onChange={this.handleChangeFirstName} value={this.state.first_name} />
                </div>

                <div>
                    <h3><label>Email</label></h3>
                    <input type="text" onChange={this.handleChangeEmail} value={this.state.email} />
                </div>

                <br/><br/>
                <ButtonToolbar>
                <Button type="submit" color="primary" onClick={this.subscribe}>Sign Up</Button>
                </ButtonToolbar>
                <br/>

            </form>
            
        );
    }
    
}

export default SignUp;