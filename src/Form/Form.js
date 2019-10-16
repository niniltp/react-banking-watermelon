import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonToolbar } from 'reactstrap';
import users from '../data/users';

class Form extends Component {

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

        for (let i=0; i<users.length; i++){
                /*
                //test d'affichage de la liste des données sur les utilisateurs 
            console.log(users[i].id +"\n"+
                users[i].first_name +"\n"+
                users[i].last_name +"\n"+ 
                users[i].email +"\n"+
                users[i].password +"\n"+
                users[i].is_admin +"\n\n");*/

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
                <div>
                    <h3><label>Email</label></h3>
                    <input type="text" onChange={this.handleChangeEmail} value={this.state.email} />
                </div>

                <div>
                    <h3><label>Password</label></h3>
                    <input type="password" onChange={this.handleChangePassword} value={this.state.password} />
                </div>
                <br/><br/>
                <ButtonToolbar>
               <Button type="submit" color="primary" onClick={this.connexion} >Connexion</Button>
               <Button type = "submit" color="primary" onClick={this.inscription}>S'inscrire</Button>
               </ButtonToolbar>
               <br/>
               <h6>Mot de passe oublié</h6>

            </form>
            
        );
    }
        

}
export default Form;
