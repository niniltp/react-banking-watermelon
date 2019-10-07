import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonToolbar } from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state={running:false};
    this.connexion = this.connexion.bind(this);
    this.inscription = this.inscription.bind(this);
  }
  
  connexion(){
    this.setState({ running: true });
    console.log("Vous aviez appuyé sur le bouton connexion !");
  }

  inscription(){
    console.log("Vous aviez appuyé sur le bouton inscription!");
  }

  render(){
    return(
      <div className="App">
        <header className="App-header">
          <form>
                <h3>Identifiant</h3>
                <input type="text" name="id_user"/>
                <h3>Mot de Passe</h3>
                <input type="password" name="password" />
                <br/><br/>
               
                <ButtonToolbar>
               <Button type="submit" color="primary" onClick={this.connexion} >Connexion</Button>
               <Button color="primary" onClick={this.inscription}>S'inscrire</Button>
               </ButtonToolbar>
               <br/>
               <h6>Mot de passe oublié</h6>
          </form>
        </header>
      </div>
    );

  }

}

export default App;
