import React from "react";
import {Route, Link} from 'react-router-dom';
import {isAuth, isAdmin} from "../services/authenticationManager";

export const ProtectedRouteAdmin = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={
                props => {
                    if (isAuth() && isAdmin()) {
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