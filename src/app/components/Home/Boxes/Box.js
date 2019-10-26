import React, {Component} from 'react';
import '../Boxes/Boxes.css';
import {CustomInput} from "reactstrap";

class Box extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: this.props.index,
            data: this.props.data,
            mouseHover: false,
            switchState: false
        };
    }

    setMouseHover = () => {
        this.setState({
            mouseHover: true
        })
    };

    setMouseNotHover = () => {
        this.setState({
            mouseHover: false
        })
    };

    initSwitch = (state) => {
        this.setState({
            switchState: state
        });
    };

    handleSwitch = (event) => {
        this.setState((prevState) => ({
            switchState: !prevState.switchState
        }), () => {
            this.props.onSwitch(this.props.index, this.state.switchState);
        });
    };

    displayBox = () => {
        const Cont = this.props.container;
        return (
            <div className={this.props.classNames} onMouseEnter={this.setMouseHover}
                 onMouseLeave={this.setMouseNotHover}>
                <Cont data={this.state.data} initSwitch={this.initSwitch}/>
                {this.props.switchON ?
                    <CustomInput type="switch" id={"switch-input" + this.props.index} name="switch"
                                 className="switch-input"
                                 checked={this.state.switchState} onChange={this.handleSwitch}
                                 label={this.props.switchLabel}/> : null}
                }
            </div>
        )
    };

    render() {
        return (
            this.displayBox()
        );
    }
}

export default Box;