import React, {Component} from 'react';


class Settings extends Component {

    constructor(props){
        super(props);
            this.state = ({
            email : '',
            password : '',
            errors : [],
            isModifying : false
        });
    }


    MsgErr(elt,msg){
        /*This function will add error messages to the array errors*/
        this.setState((lastState) => ({ errors : [...lastState.errors, {elt,msg} ]}));
    }


    render(){
        return ("J'essaie de comprendre ce que tu as fait dans credit cards ...");
    }
}


export default Settings;
