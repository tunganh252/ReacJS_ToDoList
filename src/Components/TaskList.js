import React, {Component} from 'react';
import TaskItem from '../Components/TaskItem'

class TaskList extends Component {
    render() {
        let {tasks} = this.props;
        let elmTasks = tasks.map((taskItem, index) => {
            return <TaskItem
                key={taskItem.id}
                index={index}
                taskItem={taskItem}
                onUpdateStatus={this.props.onUpdateStatus}
                onDeleteTask={this.props.onDeleteTask}
                onUpdate={this.props.onUpdate}></TaskItem>
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
                        <td><input type="text" className="form-control" name="filterName"/></td>
                        <td>
                            <select className="form-control" name="filterStatus">
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
