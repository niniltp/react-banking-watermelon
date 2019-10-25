import React, {Component} from 'react';
import './BoxToSelect.css';
import './Boxes.css';

class BoxToSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: false,
            prevSelectedIndex: this.props.selectedIndex,
            data: this.props.data
        }
    }

    static getDerivedStateFromProps(props, state) {
        // Re-run the filter whenever props change
        if (state.prevSelectedIndex !== props.selectedIndex) {
            return {
                isSelected: props.selectedIndex === props.index,
                prevSelectedIndex: props.selectedIndex,
                data: props.data
            };
        }

        return null;
    }

    select = () => {
        this.setState({isSelected: true});
        this.props.handleSelect(this.props.index);
    };

    deselect = () => {
        this.setState({isSelected: false});
        this.props.handleSelect(null);
    };

    handleClick = () => {
        if (!this.state.isSelected && this.props.selectedCardIndex !== this.props.index)
            this.select();
        else
            this.deselect();
    };

    displayBox = () => {
        const Cont = this.props.container;
        return (
            <div className={this.state.isSelected ? "boxToSelect selected" : "boxToSelect deselected"}
                  onClick={this.handleClick}>
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

export default BoxToSelect;