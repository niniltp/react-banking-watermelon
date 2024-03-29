import React, {Component} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import logo from './app/img/logo.svg';
import './App.css';
import SignIn from './app/components/Form/SignIn';
import SignUp from './app/components/Form/SignUp.js';
import PwdForgot from './app/components/Form/PwdForgot.js';
import changePwd from './app/components/Form/changePwd.js';
import Home from './app/components/Home/Home.js';
import {ProtectedRoute} from './app/components/ProtectedRoute';
import {disconnectUser} from "./app/services/authenticationManager.js";
import {isAuth} from "./app/services/authenticationManager";
import {checkResetLS} from "./app/services/localStorageManager";

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
        checkResetLS();
        if (!isAuth()) disconnectUser();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Link to="/"><img src={logo} className="App-logo" alt="logo"/></Link>
                </header>
                <Switch>
                    <Route exact path="/" component={SignIn}/>
                    <Route path="/signUp" component={SignUp}/>
                    <Route path="/pwdForgot" component={PwdForgot}/>
                    <Route path="/changePwd" component={changePwd}/>
                    <ProtectedRoute path="/account" component={Home}/>
                    <ProtectedRoute path="/settings" component={Home}/>
                    <ProtectedRoute path="/cards" component={Home}/>
                    <ProtectedRoute path="/activity" component={Home}/>
                    <ProtectedRoute path="/withdraw" component={Home}/>
                    <ProtectedRoute path="/deposit" component={Home}/>
                    <ProtectedRoute path="/transfer" component={Home}/>
                    <Route path="*" component={() => <div>
                            <h1>ERROR 404 PAGE NOT FOUND</h1>
                            <br/>
                            <h6><Link to="/">Go to the login page</Link></h6>
                        </div>}/>
                </Switch>
            </div>
        );
    }
}

export default App;
