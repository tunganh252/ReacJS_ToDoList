import React, { Component } from 'react';
import TaskItem from '../Components/TaskItem'

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1                ///    -1: all       0: deactive        1: active
        }
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus,
        )
        this.setState({
            [name]: value
        })
    }

    render() {
        let { tasks } = this.props;
        let { filterName, filterStatus } = this.state;
        let elmTasks = tasks.map((taskItem, index) => {
            return <TaskItem
                key={taskItem.id}
                index={index}
                taskItem={taskItem}
                onUpdateStatus={this.props.onUpdateStatus}
                onDeleteTask={this.props.onDeleteTask}
                onUpdate={this.props.onUpdate}
                onFilter={this.props.onFilter}
            ></TaskItem>
        })
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td><input type="text"
                            className="form-control"
                            name="filterName"
                            value={filterName}
                            onChange={(event) => this.onChange(event)} />
                        </td>
                        <td>
                            <select className="form-control"
                                name="filterStatus"
                                value={filterStatus}
                                onChange={(event) => this.onChange(event)}
                            >
                                <option value="-1">Tất Cả</option>
                                <option value="0">Ẩn</option>
                                <option value="1">Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elmTasks}
                </tbody>
            </table>
        );
    }
}

export default TaskList;
