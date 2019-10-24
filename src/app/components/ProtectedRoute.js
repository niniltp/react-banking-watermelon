import React from "react";
import {Route, Link} from 'react-router-dom';
import {isAuth} from "../services/authenticationManager";

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={
                props => {
                    if (isAuth()) {
                        return <Component {...props}></Component>;
                    } else return (
                        <div>
                            <h1>ERROR 404 PAGE NOT FOUND</h1>
                            <br/>
                            <h6><Link to="/">Go to the login page</Link></h6>
                        </div>
                        );
                }
            }
        />
    );

};