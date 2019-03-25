import React, { Component } from 'react';
import Search from '../Components/Search'
import Sort from '../Components/Sort'

class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
                <br />
                {/* // search */}
                <Search
                    onSearch={this.props.onSearch}
                />
                {/* // sort */}
                <Sort />
            </div>
        );
    }
}

export default Control;
