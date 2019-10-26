import React, {Component} from 'react';


class SimpleUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.data,
            classNames: this.props.classNames ? this.props.classNames : ""
        }
    }

    componentDidMount() {
        if(this.props.initSwitch)
            this.props.initSwitch(this.state.user.is_admin);
    }

    displayUser = () => {
        return (
            <div className={this.state.classNames}>
                <ul>
                    <li><span className="labelInfoBox">First name: </span>{this.state.user.first_name}</li>
                    <li><span className="labelInfoBox">Last name: </span>{this.state.user.last_name}</li>
                    <li><span className="labelInfoBox">Email: </span>{this.state.user.email}</li>
                </ul>
                {/*                <Row>
                    <Col sm={3}><span className="labelInfoBox">First name: </span></Col><Col sm={9}><span className="infoBox">{this.state.user.first_name}</span></Col>
                </Row>
                <Row>
                    <Col sm={3}><span className="labelInfoBox">Last name: </span></Col><Col sm={9}><span className="infoBox">{this.state.user.last_name}</span></Col>
                </Row>
                <Row>
                    <Col sm={3}><span className="labelInfoBox">Email: </span></Col><Col sm={9}><span className="infoBox">{this.state.user.email}</span></Col>
                </Row>*/}
            </div>
        )
    };

    render() {
        return (
            this.displayUser()
        );
    }
}

export default SimpleUser;