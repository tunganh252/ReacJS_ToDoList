import React, { Component } from 'react';

class Sort extends Component {

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);

    }

    onClick = (sortBy, sortValue) => {

        this.props.onSort(sortBy, sortValue);
    }
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle"
                        type="button" id="dropdownMenu1"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                    >Sắp Xếp
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)}
                        ><a href='localhost:9999' type="button"
                        className={(this.props.sortBy === 'name' && this.props.sortValue === 1) ? 'sort_selected' : ''}
                        >Tên A-Z</a></li>

                        <li onClick={() => this.onClick('name', -1)}
                        ><a href='localhost:9999' type="button"
                        className={(this.props.sortBy === 'name' && this.props.sortValue === -1) ? 'sort_selected' : ''}
                        > Tên Z-A </a></li>

                        {/* <li type="separator" className="divider"></li> */}

                        <li onClick={() => this.onClick('status', 1)}
                        ><a href='localhost:9999' type="button"
                        className={(this.props.sortBy === 'status' && this.props.sortValue === 1) ? 'sort_selected' : ''}
                        >Trạng Thái Kích Hoạt</a></li>

                        <li onClick={() => this.onClick('status', -1)}
                        ><a href='localhost:9999' type="button"
                        className={(this.props.sortBy === 'status' && this.props.sortValue === -1) ? 'sort_selected' : ''}
                        >Trạng Thái Ẩn</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sort;
