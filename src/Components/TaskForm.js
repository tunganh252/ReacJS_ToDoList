import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    // Update
    componentWillMount() {
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            });
        } else if (!nextProps.task) {
            this.setState ({
                id: '',
                name: '',
                status: false
            });
        }
    }

    /////////
    handleChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ?
                true :
                false
        }
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this
            .props
            .onSubmit(this.state);
        this.props.onCloseForm();
    }
    // Button hủy bỏ
    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }
    onCloseForm = () => {
        this
            .props
            .onCloseForm()
    }

    render() {
        let { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id !== ''
                            ? 'Cập nhật công việc'
                            : 'Thêm công việc'}
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={() => this.onCloseForm()}>X</span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={(e) => this.handleChange(e)}
                                placeholder="Nhập tên công việc" />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            name="status"
                            value={this.state.status}
                            onChange={(e) => this.handleChange(e)}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br></br>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>
                                Lưu Lại
                            </button>
                            &nbsp;
                            <button onClick={() => this.onClear()} type="button" className="btn btn-danger">
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;
