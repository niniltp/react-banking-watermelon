
  

import React, {Component} from 'react';

class OthersParameters extends Component{

    constructor(props) {
        super(props);
        this.state = ({
           
        });
    }


    toSortByLastName(arrayOfObject){
        arrayOfObject.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            if (a.name === b.name) {
                this.toSortByFirstName(arrayOfObject);
            }
        });
    }


    toSortByFirstName(arrayOfObject){
        arrayOfObject.sort((a, b) => {
        if (a.first_name > first_name) {
          return 1;
        }
        if (a.first_name < b.first_name) {
            return -1;
        }
        
        if (a.first_name < b.first_name) {
            
        }

        });
    }



    render(){

        return (
            <label>
            Choose the user :
            <select value={this.state.value} onChange={this.handleChange}>
                <option value={}>Pamplemousse</option> {/*//A REMPLACER PAR SELECTOPTION*/}
            </select>
        </label>
            
        );
    }


}

export default OthersParameters;