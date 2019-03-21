import React, { Component } from 'react';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.taskItem.id);
    }
    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.taskItem.id);
        
    }
    onUpdate = () =>{
        this.props.onUpdate(this.props.taskItem.id);
    }
    render() {
        let { taskItem, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{taskItem.name}</td>
                <td className="text-center">
                    <span
                        onClick={() => this.onUpdateStatus()}
                        className={taskItem.status === true ? 'label label-success' : 'label label-danger'}>
                        {taskItem.status === true ? 'Kích hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button
                        onClick={()=>this.onUpdate()}
                        type="button" 
                        className="btn btn-warning">
                        <span className="fa fa-pencil mr-5">Sửa</span>
                    </button>
                    &nbsp;
                    <button 
                        onClick={()=>this.onDeleteTask()}
                        type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5">Xóa</span>
                    </button>
                </td>
            </tr>

        );
    }
}

export default TaskItem;
