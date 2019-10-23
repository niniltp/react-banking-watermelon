import React from "react";
import {Route} from 'react-router-dom';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={
                props => {
                    if (JSON.parse(localStorage.getItem("isAuth")) === true) {
                        return <Component {...props}></Component>;
                    } else return "ERROR 404 PAGE NOT FOUND";
                }
            }
        />
    );

};