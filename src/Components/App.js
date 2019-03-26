import React, { Component } from 'react';
import TaskForm from '../Components/TaskForm'
import TaskControl from './TaskControl'
import TaskList from '../Components/TaskList'
import '../App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [], // id:unique, name, status
            showTaskForm: false,
            taskEditing: null,
            keyword: '',
            filter: {
                name: '',
                status: -1
            },
            sortBy: 'name',
            sortValue: 1
        }
    }
    // Toggle Form (show/hide)
    onToggleForm = () => { /// Thêm task
        if (this.state.showTaskForm && this.state.taskEditing !== null) {
            this.setState({
                showTaskForm: true,
                taskEditing: null
            });

        } else {
            this.setState({
                showTaskForm: !this.state.showTaskForm,
                taskEditing: null
            });
        }
    }
    onCloseForm = () => {
        this.setState({ showTaskForm: false, taskEditing: null });
    }
    onShowForm = () => {
        this.setState({ showTaskForm: true });
    }
    //**Add new */
    onSubmit = (data) => {
        let { tasks } = this.state;
        if (data.id === '') {
            data.id = this.generateID();
            tasks.push(data)
        } else {
            let index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({ tasks: tasks, taskEditing: null });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    // End show/hide form Update status
    onUpdateStatus = (id) => {
        let { tasks } = this.state;
        let index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
        }
        this.setState({ tasks: tasks });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    findIndex = (id) => {
        let { tasks } = this.state;
        let result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                return result = index;
            }
        });
        return result;
    }

    // End Update status
    /**
	 * Update task theo id
	 */
    onUpdate = (id) => {
        let { tasks } = this.state;
        let index = this.findIndex(id);
        let taskEditing = tasks[index];
        this.setState({ taskEditing: taskEditing });
        this.onShowForm()

    }
    // End function Update Delete task
    onDeleteTask = (id) => {
        let { tasks } = this.state;
        let index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({ tasks: tasks });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }
    // End delete taks lifecycle
    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            let tasks = JSON.parse(localStorage.getItem('tasks'))
            this.setState({ tasks: tasks });
        }
    }
    // Lọc dữ liệu trên table
    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        })

    }
    // Search
    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        })

    }
    // Sort table
    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        })
    }
    /**
     * //////////////
     * //////////////
     * //////////////
     */

    // Tạo random ID
    s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    generateID = () => {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }
    // End random ID
    //--------------

    render() {
        let { tasks, showTaskForm, taskEditing, filter, keyword, sortBy, sortValue } = this.state; /// let tasks = this.state.tasks
        if (filter) {
            if (filter.name) {
                tasks = tasks.filter(item => {
                    return item.name.toLowerCase().indexOf(filter.name) !== -1;
                })
            }
            /** K dùng if(filter.status) /// => so sánh dk != 0 nên trường hơp 0: deactive bị loại bỏ */
            tasks = tasks.filter(item => {
                if (filter.status === -1) {
                    return item
                }
                else {
                    return item.status === (filter.status === 1 ? true : false);
                }
            });
        }
        if (keyword) {
            tasks = tasks.filter(item => {
                return item.name.toLowerCase().indexOf(keyword) !== -1;
            });
        }
        /**
         * Sort theo tên - status
         */
        if (sortBy === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) {
                    return sortValue;
                }
                else if (a.name < b.name) {
                    return -sortValue;
                }
                else {
                    return 0;
                }
            });
        } else if (sortBy === 'status') {
            tasks.sort((a, b) => {
                if (a.status > b.status) {
                    return -sortValue;
                }
                else if (a.status < b.status) {
                    return sortValue;
                }
                else {
                    return 0;
                }
            });
        }

        let elmShowTaskForm = showTaskForm
            ? <TaskForm
                onSubmit={this.onSubmit}
                onCloseForm={this.onCloseForm}
                // onToggleForm= {this.onToggleForm}
                task={taskEditing} />
            : '';

        /**/////////////////////////////////////////////////////////////////////// */
        /**///////////////////==============================////////////////////// */
        /**/////////////////////////////////////////////////////////////////////// */

        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr />
                </div>
                <div className="row">
                    <div
                        className={showTaskForm
                            ? 'col-md-4'
                            : ''}>
                        {/* TaskForm */}
                        {elmShowTaskForm}
                    </div>
                    <div
                        className={showTaskForm
                            ? 'col-md-8'
                            : 'col-md-12'}>
                        <button
                            onClick={() => this.onToggleForm()}
                            type="button"
                            className="btn btn-primary">
                            <span className="fa fa-plus mr-5"></span>
                            Thêm Công Việc
                        </button>
                        {/* Search + Sortable */}
                        <TaskControl
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}
                        />
                        <br /> {/* Task show full list */}
                        <TaskList
                            tasks={tasks}
                            onUpdateStatus={this.onUpdateStatus}
                            onDeleteTask={this.onDeleteTask}
                            onUpdate={this.onUpdate}
                            onFilter={this.onFilter}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
// Generate data (set cứng): Dùng cho ban đầu tạo mẫu onGenerateData = () => {
// 	let tasks = [ 		{ 			id: this.generateID(), 			name: 'Học lập trình',
// 			status: true 		}, 		{ 			id: this.generateID(), 			name: 'Học võ',
// 			status: false 		}, 		{ 			id: this.generateID(), 			name: 'Đi bơi',
// 			status: true 		} 	]; 	this.setState({ 		tasks: tasks 	});
// 	localStorage.setItem('tasks', JSON.stringify(tasks)); } onSubmit nhận thông
// tin từ taskForm và push lên tasks