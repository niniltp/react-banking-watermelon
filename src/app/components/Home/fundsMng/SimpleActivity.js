import React, {Component} from 'react';
import '../Boxes/Boxes.css';
import SimpleWithdrawal from "./SimpleWithdrawal";
import SimpleDeposit from "./SimpleDeposit";
import SimpleTransfer from "./SimpleTransfer";

class SimpleActivity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        }
    }

    displayActivity = () => {
        const type = this.props.data.type;
        const classNames = "activity " + type;

        return (
            <div className={classNames}>
                {type === "payin" ? <SimpleDeposit data={this.state.data}/> : null}
                {type === "payout" ? <SimpleWithdrawal data={this.state.data}/> : null}
                {type === "transfer" ? <SimpleTransfer data={this.state.data}/> : null}
            </div>
        )
    };

    render() {
        return (
            this.displayActivity()
        );
    }
}

export default SimpleActivity;