import React, {Component} from 'react';

class Box extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        }
    }

    displayBox = () => {
        const Cont = this.props.container;
        return (
            <div className={this.state.isSelected ? "boxToSelect" : "boxToSelect"}>
                <Cont data={this.state.data} classNames={this.props.classNames}/>
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