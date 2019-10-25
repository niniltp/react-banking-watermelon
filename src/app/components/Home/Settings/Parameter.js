import React, {Component} from 'react';
import settings from '../../../img/settings.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Row, FormGroup, Label} from "reactstrap";
import Form from 'react-bootstrap/Form';
import {getUsers, updateUser} from "../../../backend/users_backend";
import {getDataFromLS} from "../../../services/localStorageManager";

//code written by CHEONG Loïc

class Parameter extends Component {

    constructor(props){
        super(props);
            this.state = ({
            otherParamsValue :'',
            pwd1 : '',
            pwd2 : '',
            pwd3 : '',
            errors : [],
            parameters : this.props.param,
            isModifying : false
        });
        this.handleChangeOtherParamsValue = this.handleChangeOtherParamsValue.bind(this);
        this.handleChangePwd1 = this.handleChangePwd1.bind(this);
        this.handleChangePwd2 = this.handleChangePwd2.bind(this);
        this.handleChangePwd3 = this.handleChangePwd3.bind(this);
        this.wantChangeParam = this.wantChangeParam.bind(this);
        //this.confirmChange = this.confirmChange.bind(this);
        this.cancelChange = this.cancelChange.bind(this);
        this.checkField = this.checkField.bind(this);
    }

    handleChangeOtherParamsValue(event){
        this.setState({otherParamsValue: event.target.value});
    }

    handleChangePwd1(event) {
        this.setState({pwd1: event.target.value});
    }

    handleChangePwd2(event) {
        this.setState({pwd2: event.target.value});
    }

    handleChangePwd3(event) {
        this.setState({pwd3: event.target.value});
    }

    wantChangeParam(){
        //The user wants to change a parameter bu pressing th button change (gearwheel)
        this.setState({
            isModifying: true, //the user can modify the chosen parameter
            errors : [],  //reinitialize an empty array errors
            otherParamsValue :'', //reinitialize
            pwd1 : '', //reinitialize
            pwd2 : '', //reinitialize
            pwd3 : '' //reinitialize
        });
        //console.log(this.state.isModifying);
    }

    confirmChange(){
        this.setState({isModifying: false});
        //TO COMPLETE
    }

    cancelChange(){
        this.setState({isModifying: false});
    }

    MsgErr(elt, msg) {
        /*This function will add error messages to the array errors
        It will be use in the funciton checkField*/
        this.setState((lastState) => ({errors: [...lastState.errors, {elt, msg}]}));
    }


    checkField(){
        //this function checks if there is what it is expected in the fields
        //Otherwise, it will display a msg error
        //If everything is correct, then update data
        this.setState({errors : [] });
        const validation = 1;
        //console.log(this.state.email);
        const elt = this.props.param.name;

        if (elt === "Password") {
            if (this.state.pwd1=== "" || this.state.pwd2=== "" || this.state.pwd3=== "") {
                this.MsgErr("Empty","One of those fields is empty !");
             }
             if (this.state.pwd2 !=  this.state.pwd3){
                 this.MsgErr("NotSamePwd","You password is not the same in these two fields !");
             }
             if ((this.state.pwd2 ===  this.state.pwd3) && this.state.pwd2.length<8 && this.state.pwd2 != "") {
                 this.MsgErr("PwdLength","You password is too short !");
             }
            if (this.props.val != this.state.pwd1 && this.state.pwd1 != "" ){
                this.MsgErr("wrongPwd","Wrong password");
            }
            if ((this.state.parameters.val === this.state.pwd1) && (this.state.pwd2 ===  this.state.pwd3) && this.state.pwd1.length>=8 ) {
                console.log("Your password has been changed successfully !");
                
                const value = this.state.pwd2;
                console.log(elt);
                console.log(value);
                this.updateParam(elt,value);
                this.setState({isModifying: false});
             }
        } else {
            if (this.state.otherParamsValue === "") {
                this.MsgErr("Empty","You have not to fill in this field !");
            } else {
                if (elt === "Email") {
                    const users = getUsers(); 
                    const user = users.filter((user)=> {return user.email===this.state.otherParamsValue;});
                    if (user.length === 1 && user[0].email===this.state.otherParamsValue) {//the user has been found in the array users
                        this.MsgErr("wrongEmail","There is already an user under this email address ! 1 email = 1 account");
                    } else {
                        const value = this.state.otherParamsValue;
                        this.updateParam(elt,value);
                        this.setState({isModifying: false});
                    }
                } else{
                    const value = this.state.otherParamsValue;
                    //console.log(value);
                    if (elt === "First name") this.updateParam(elt,value);
                    if (elt === "Last name") this.updateParam(elt,value);
                    this.setState({isModifying: false});
                    //TO COMPLETE
                }
                
            }
        }
        return validation === 0 ? true : false;
    }

    updateParam = (ParamName, ParamValue) =>{
        //this function updates new user's data in the Watermelon database
        const users = getUsers();
        const user_ID = getDataFromLS("userID");
        const i = users.findIndex((user) => user.id === user_ID); //index
        let userUpdated;
        //console.log(index);

        switch(ParamName){
           case "First name" : 
                userUpdated = {
                    id: user_ID,
                    first_name: ParamValue,
                    last_name: users[i].last_name, 
                    email: users[i].email, 
                    password: users[i].password,
                    is_admin: users[i].is_admin
                };
            break;
            case "Last name" :
                userUpdated = {
                    id: user_ID,
                    first_name: users[i].first_name,
                    last_name: ParamValue, 
                    email: users[i].email, 
                    password: users[i].password, 
                    is_admin: users[i].is_admin
           };
            break;
            case "Email" : 
                    userUpdated = {
                        id: user_ID,
                        first_name: users[i].first_name,
                        last_name: users[i].last_name, 
                        email: ParamValue, 
                        password: users[i].password, 
                        is_admin: users[i].is_admin
                    };
            break;
            case "Password" : 
                userUpdated = {
                    id: user_ID,
                    first_name: users[i].first_name,
                    last_name: users[i].last_name, 
                    email: users[i].email, 
                    password: ParamValue, 
                    is_admin: users[i].is_admin
                };
            break;
        }
        const par =  {name : ParamName, val : ParamValue};
        this.setState({parameters : par});
        updateUser(userUpdated);
        //console.log(par);
        //console.log(this.state.parameters);
        //console.log(this.state.parameters.val);
    }


    displayParam(elt){
    //this function display user's data without input
        if (elt === "Password"){
            return (
                <div>
                    <Row> 
                        <Col>{elt} : </Col>
                        <Col>{"**********"}</Col>
                    <Col><img src={settings} alt="logo-modify" className="modifyBox" onClick={this.wantChangeParam}/></Col>
                    </Row>
                </div>
            );
        } else {
            return (
                <div>
                    <Row> 
                        <Col>{elt} : </Col>
                        <Col>{this.state.parameters.val}</Col>
                    <Col><img src={settings} alt="logo-modify" className="modifyBox" onClick={this.wantChangeParam}/></Col>
                    </Row>
                </div>
            );
        }
    }


    displayChangingParam(elt){
    //this function display the form in order to allow th user to change its data   
        //console.log("You are in the function displayChangingParam()");
        let passwordErr1 = null, passwordErr2 = null, OtherParamsValueErr = null;

        for (let err of this.state.errors) {
            if (err.elt === "Empty") {
                passwordErr1 = err.msg;
                passwordErr2 = err.msg;
                OtherParamsValueErr = err.msg;
            }
            if (err.elt === "NotSamePwd") passwordErr2 = err.msg;
            if (err.elt === "PwdLength") passwordErr2 = err.msg;
            if (err.elt === "wrongPwd") passwordErr1  = err.msg;
            if (err.elt === "wrongEmail") OtherParamsValueErr  = err.msg;
        }

        if (elt === "Password"){
            //console.log("You want to change a password");
            return (
                <div>
                    <Form  >
                        
                        <Form.Group controlId="formGroupPassword" >  
                        <Row>                              
                            <Col><Label>Last password</Label> </Col>
                            <Col>
                                <Form.Control type="password" placeholder="Last password" onChange={this.handleChangePwd1} value={this.state.pwd1}/>
                                <p style={{fontSize: 12, color: "red"}}>{passwordErr1 ? passwordErr1 : ""}</p>
                            </Col>
                            <Col></Col>
                            </Row>
                        </Form.Group>
                        
                        <Form.Group controlId="formGroupPassword">
                        <Row>
                            <Col><Form.Label>New password</Form.Label></Col>
                            <Col>
                                <Form.Control type="password" placeholder="New password (8 or mor characters)" onChange={this.handleChangePwd2} value={this.state.pwd2}/>
                                <p style={{fontSize: 12, color: "red"}}>{passwordErr2 ? passwordErr2 : ""}</p>
                            </Col>
                            <Col></Col>
                            </Row>
                        </Form.Group>

                        <Form.Group controlId="formGroupPassword">
                        <Row>
                            <Col><Form.Label>Confirm new password</Form.Label></Col>
                            <Col>
                                <Form.Control type="password" placeholder="Confirm new password" onChange={this.handleChangePwd3} value={this.state.pwd3}/>
                                <p style={{fontSize: 12, color: "red"}}>{passwordErr2 ? passwordErr2 : ""}</p>
                            </Col>
                            <Col></Col>
                            </Row>
                        </Form.Group>

                        <FormGroup check className="box-formGroup reset-margin" row sm={{size: 10, offset: 2}} >
                                <Button color="success" className="boxForm-btn"
                                        onClick={this.checkField}>Save</Button>
                                <Button color="danger" className="boxForm-btn"
                                        onClick={this.cancelChange}>Cancel</Button>
                        </FormGroup>
                    </Form>
                </div>
            );
        } else {
            return (
                <div>
                    <Form>

                        <Form.Group controlId="formGroupPassword" >  
                            <Row>                              
                                <Col><Label>{elt}</Label> </Col>
                                <Col>
                                    <Form.Control type="text" placeholder={elt} onChange={this.handleChangeOtherParamsValue} value={this.state.otherParamsValue}/>
                                    <p style={{fontSize: 12, color: "red"}}>{OtherParamsValueErr ? OtherParamsValueErr : ""}</p>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Form.Group>

                        <FormGroup check className="box-formGroup reset-margin" row sm={{size: 10, offset: 2}} >
                                    <Button color="success" className="boxForm-btn"
                                            onClick={this.checkField}>Save</Button>
                                    <Button color="danger" className="boxForm-btn"
                                            onClick={this.cancelChange}>Cancel</Button>
                        </FormGroup>
                    </Form>
                </div>
            );
        }
    }


    render(){
        return (
            <div>
                <br/>
                {
                   this.state.isModifying ? this.displayChangingParam(this.state.parameters.name) : this.displayParam(this.state.parameters.name)
                }
            </div>
        );
    }
}


export default Parameter;