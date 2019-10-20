import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonToolbar } from 'reactstrap';
import watermelon from './watermelon.png';
import {Link } from 'react-router-dom';
import users from '../data/users';


class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password : ''};
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.connexion = this.connexion.bind(this);
        this.inscription = this.inscription.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }
     
    connexion(){
        
        console.log("Vous aviez appuyé sur le bouton connexion !");
        console.log(this.state.email + " " + this.state.password);
        /*
        const person localStorage.getItem("users").map((user) => 
        
        <ul>
            <li>user.id +"\n"</li>
            <li>user.first_name +"\n"</li>
            <li>user.last_name +"\n"</li>
            <li>user.email +"\n"</li>
            <li>user.password +"\n"</li>
            <li>user.is_admin +"\n\n"</li>
        </ul>
        </br>
        );*/

        for (let i=0; i<users.length; i++){
            /*    
                //test d'affichage de la liste des données sur les utilisateurs 
            console.log(users[i].id +"\n"+
                users[i].first_name +"\n"+
                users[i].last_name +"\n"+ 
                users[i].email +"\n"+
                users[i].password +"\n"+
                users[i].is_admin +"\n\n");
            */

            if (users[i].email===this.state.email && users[i].password === this.state.password) {
                this.setState({ running: true });
                console.log("Vous vous êtes bien connecté !");
                console.log(users[i].first_name +" " +users[i].last_name);
            }
            else {
                console.log("Vous ne vous êtes pas bien connecté !");
            }
        }
            
      }
    
      inscription(){
        console.log("Vous aviez appuyé sur le bouton inscription!");
    }

    render() {
        return (
            <form>
                <div className="home-container">
                
                <div>
                    <img src={watermelon} className="App-logo" alt="logo" />
                    <h4><label>Email</label></h4>
                    <input type="email" onChange={this.handleChangeEmail} value={this.state.email} />
                </div>
                <br/>
                <div>
                    <h4><label>Password</label></h4>
                    <input type="password" onChange={this.handleChangePassword} value={this.state.password} />
                </div>
                <br/>
                <ButtonToolbar>
               <Button type="submit" color="primary"  onClick={this.connexion} >Sign in</Button>
              { /* <Button type = "submit" color="primary" onClick={this.inscription}>S'inscrire</Button>*/}
               
               </ButtonToolbar>
               <br/>
               <h6><Link to="/signUp">New to Watermelon ? Join now !</Link></h6>
               <br/>
               <h6><Link to="/pwdForgot">Forgot password ?</Link></h6>
               </div>
            </form>
            
        );
    }
        

}
export default SignIn;
