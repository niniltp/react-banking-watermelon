import React, {Component} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import logo from './app/img/logo.svg';
import './App.css';
import SignIn from './app/components/Form/SignIn';
import SignUp from './app/components/Form/SignUp.js';
import PwdForgot from './app/components/Form/PwdForgot.js';
import Home from './app/components/Home/Home.js';
import {ProtectedRoute} from './app/components/ProtectedRoute';
import {disconnectUser} from "./app/services/authenticationManager.js";
import {isAuth} from "./app/services/authenticationManager";

//TODO: Home -> change user_id with user auth
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        /*this fonction fires after the initial render
        Set the database in localStorage*/
        localStorage.clear(); //TODO: delete this line ?
        // setDataInLS("cards", cards);
        // setDataInLS("payins", payins);
        // setDataInLS("payouts", payouts);
        // setDataInLS("transfers", transfers);
        // setDataInLS("users", users);
        // setDataInLS("wallets", wallets);

        if (!isAuth()) disconnectUser();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Link exact to="/"><img src={logo} className="App-logo" alt="logo"/></Link>
                </header>
                <Switch>
                    <Route exact path="/" component={SignIn}/>
                    <Route path="/signUp" component={SignUp}/>
                    <Route path="/pwdForgot" component={PwdForgot}/>
                    <ProtectedRoute path="/account" component={Home}/>
                    <ProtectedRoute path="/cards" component={Home}/>
                    <Route path="*" component={() => "ERROR 404 PAGE NOT FOUND"}/>
                </Switch>
            </div>
        );
    }
}

export default App;
