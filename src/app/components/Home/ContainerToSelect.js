import React, {Component} from 'react';
import './ContainerToSelect.css';


class ContainerToSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseHover: false,
            isSelected: false,
            prevSelectedIndex: this.props.selectedIndex,
            data: this.props.data
        }
    }

    static getDerivedStateFromProps(props, state) {
        // Re-run the filter whenever props change
        if (state.prevSelectedIndex !== props.selectedIndex) {
            return {
                mouseHover: state.mouseHover,
                isSelected: props.selectedIndex === props.index,
                prevSelectedIndex: props.selectedIndex,
                data: props.data
            };
        }

        return null;
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

    select = () => {
        this.setState({isSelected: true});
        this.props.handleSelect(this.props.index);
    };

    deselect = () => {
        this.setState({isSelected: false});
    };

    handleClick = () => {
        if (!this.state.isSelected && this.props.selectedCardIndex !== this.props.index)
            this.select();
        else
            this.deselect();
    };

    displayCard = () => {
        const Cont = this.props.container;
        return (
            <div className={this.state.isSelected ? "containerToSelect selected" : "containerToSelect deselected"}
                 onMouseEnter={this.setMouseHover} onMouseLeave={this.setMouseNotHover} onClick={this.handleClick}>
                <Cont data={this.state.data} classNames={this.props.classNames}/>
            </div>
        )
    };

    render() {
        return (
            this.displayCard()
        );
    }
}

export default ContainerToSelect;