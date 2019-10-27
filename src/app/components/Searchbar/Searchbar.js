import React, {Component} from 'react';
import Input from "reactstrap/es/Input";
import './Searchbar.css';

class Searchbar extends Component {
    constructor(props) {
        super(props);

        this.input = React.createRef();

        this.state = {
            value: this.props.searchValue,
            isOpen: false,
            results: this.props.items
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.input.current.focus();
    }

    filterResults = (searchValue) => {
        this.setState({
            results: this.props.items.filter((item) => {
                return item.value.toLowerCase().indexOf(searchValue) > -1;
            })
        }, () => {
            this.setResults(this.state.value, this.state.results.map((result) => {
                return result.id;
            }))
        });
    };

    setResults = (searchValue, resultsID) => {
        this.props.searchResults(searchValue, resultsID);
    };

    handleChange = (event) => {
        const value = event.target.value;

        this.setState({
            value: value,
            isOpen: true
        }, () => {
            this.filterResults(this.state.value);
        });
    };

    handleClickSearchbar = (event) => {
        event.preventDefault();

        this.setState((prevState) => ({
            isOpen: !prevState.isOpen
        }));
    };

    handleClickItem = (event) => {
        const resultID = parseInt(event.target.dataset.id);
        let resultsID = [];
        resultsID.push(resultID);
        this.setResults(this.state.value, resultsID);
    };

    render = () => {
        const placeholder = this.props.placeholder ? this.props.placeholder : "";
        const autoFocus = this.props.autoFocus ? this.props.autoFocus : false;

        return (
            <div className="searchbar">
                <Input autoFocus={autoFocus} type="text" placeholder={placeholder} ref={this.input} value={this.state.value}
                       onChange={this.handleChange}
                       onClick={this.handleClickSearchbar}/>
                {this.state.isOpen ?
                    <ul className="searchbar-results">
                        {this.state.results.map((result, index) => (
                            <li className="searchbar-result" key={index} onClick={this.handleClickItem}
                                data-id={result.id}>{result.value}</li>
                        ))}
                    </ul> : null}
            </div>
        );
    }
}

export default Searchbar;