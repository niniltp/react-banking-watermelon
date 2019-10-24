import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import './fundsMngForm.css';
import {getUserIDAuth} from "../../../services/authenticationManager";
import {convertInAmount, isTransferValid} from "../../../services/fundsManager";
import {getUsersExcept} from "../../../backend/users_backend";
import SimpleUser from "../Users/SimpleUser";
import BoxToSelect from "../Boxes/BoxToSelect";
import {getWalletByUserId, updateWallet} from "../../../backend/wallets_backend";

class Transfer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userID: getUserIDAuth(),
            isFetching: true,
            users: [],
            amount: 0,
            selectedUserIndex: null,
            transferConfirmed: false
        };
    }

    componentDidMount = () => {
        this.fetchData();
    };

    fetchData = () => {
        this.setState({isFetching: true});
        this.setState({users: getUsersExcept(this.state.userID)}, () => {
            this.setState({isFetching: false});
        });
    };

    isValid = (walletDebited, walletCredited, amount) => {
        return isTransferValid(walletDebited, walletCredited, amount);
    };

    confirmTransfer = () => {
        this.setState({
            transferConfirmed: true
        });
    };

    makeTransfer = (walletDebited, walletCredited, amount) => {
        let newWalletDebited = walletDebited;
        let newWalletCredited = walletCredited;

        newWalletDebited.balance = walletDebited.balance - convertInAmount(amount);
        newWalletCredited.balance = walletCredited.balance + convertInAmount(amount);

        updateWallet(newWalletDebited);
        updateWallet(newWalletCredited);
        this.props.updateWallet();
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;

        this.setState({
            amount: value
        })
    };

    handleSelect = (index) => {
        this.setState({
            selectedUserIndex: index
        });
    };

    handleSubmit = (event) => {
        if (this.state.selectedUserIndex !== null) {
            const userCredited = this.state.users[this.state.selectedUserIndex];
            const walletCredited = getWalletByUserId(userCredited.id);
            const walletDebited = getWalletByUserId(this.state.userID);
            const amount = this.state.amount;
            event.preventDefault();

            if (this.isValid(walletDebited, walletCredited, amount)) {
                this.makeTransfer(walletDebited, walletCredited, amount);
                this.confirmTransfer();
                console.log(`transfer of ${amount}₩M from wallet (id: ${walletDebited.id}) to wallet (id: ${walletCredited.id})`);
            }
        }
    };

    displayTransferForm = () => {
        return (
            <div className="container-in">
                <div className={"fundsMng-title"}>
                    <h3>How much do you want to transfer from your wallet ?</h3>
                </div>
                <Form>
                    <FormGroup row className={"fundsMng-formGroup"}>
                        <Input type="number" min="0" max="999999999999" id="amount"
                               className="boxForm-input amount-input"
                               name="amount" value={this.state.amount} onChange={this.handleChange}/>
                        <Label for="amount" className="amount-label">₩M</Label>
                    </FormGroup>
                    <div id="boxesContainer">
                        <h3>Choose who you want to transfer money to</h3>
                        <div id="boxesList">
                            {this.state.isFetching ? <p>Fetching data...</p> : this.state.users.map((user, index) => (
                                <BoxToSelect key={index} index={index} container={SimpleUser} classNames={"box"}
                                             data={user}
                                             selectedIndex={this.state.selectedUserIndex}
                                             handleSelect={this.handleSelect}/>))}
                        </div>
                    </div>
                    <FormGroup check className="box-formGroup reset-margin" row>
                        <Col>
                            <Button color="success" className="boxForm-btn"
                                    onClick={this.handleSubmit}>Confirm</Button>
                            <Link to="/account"><Button color="danger"
                                                        className="boxForm-btn">Cancel</Button></Link>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    };

    displayTransferConfirmed = () => {
        return (
            <div>
                <p><strong>{(parseFloat(this.state.amount)).toFixed(2)}</strong>₩M has been successfully transfered from
                    your wallet to the wallet of !</p>
                {this.state.selectedCardIndex !== null ?
                    <SimpleUser data={this.state.users[this.state.selectedUserIndex]} classNames={"box"}/>
                    : null}
                <Link to="/account"><Button color="primary" className="boxForm-btn">Go back</Button></Link>
            </div>
        );
    };

    render = () => {
        return (
            this.state.transferConfirmed ? this.displayTransferConfirmed() : this.displayTransferForm()
        );
    };
}

export default Transfer;