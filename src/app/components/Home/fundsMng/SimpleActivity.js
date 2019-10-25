import React, {Component} from 'react';
import '../Boxes/Boxes.css';
import SimpleWithdrawal from "./SimpleWithdrawal";

class SimpleActivity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        }
    }

    displayActivity = () => {
        return (
            <div className="box">
                <SimpleWithdrawal data={this.state.data}/>
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