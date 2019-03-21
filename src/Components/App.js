import React, {Component} from 'react';
import TaskForm from '../Components/TaskForm'
import Control from '../Components/Control'
import TaskList from '../Components/TaskList'
import '../App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [], // id:unique, name, status
            showTaskForm: false,
            taskEditing: null
        }
    }
    // Toggle Form (show/hide)
    onToggleForm = () => { /// Thêm task
        if (this.state.showTaskForm && this.state.taskEditing !== null) {
            this.setState({
                showTaskForm: true,
                taskEditing:null
            });
            
        }else {
        this.setState({
            showTaskForm: !this.state.showTaskForm,
            taskEditing:null
        });
      }
    }
    onCloseForm = () => {
        this.setState({showTaskForm: false, taskEditing:null});
    }
    onShowForm = () => {
        this.setState({showTaskForm: true});
    }
    // End show/hide form Update status
    onUpdateStatus = (id) => {
        let {tasks} = this.state;
        let index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
        }
        this.setState({tasks: tasks});
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    findIndex = (id) => {
        let {tasks} = this.state;
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
        let {tasks} = this.state;
        let index = this.findIndex(id);
        let taskEditing = tasks[index];
        this.setState({taskEditing: taskEditing});
        this.onShowForm()

    }

    // End function Update Delete task
    onDeleteTask = (id) => {
        let {tasks} = this.state;
        let index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({tasks: tasks});
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }
    // End delete taks lifecycle
    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            let tasks = JSON.parse(localStorage.getItem('tasks'))
            this.setState({tasks: tasks});
        }
    }
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
    //
    //**Add new */
    onSubmit = (data) => {
        let {tasks} = this.state;
        if (data.id === '') {
            data.id = this.generateID();
            tasks.push(data)
        } else {
            let index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({tasks: tasks, taskEditing: null});
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    render() {
        let {tasks, showTaskForm, taskEditing} = this.state; /// let tasks = this.state.tasks
        let elmShowTaskForm = showTaskForm
            ? <TaskForm
                    onSubmit={this.onSubmit}
                    onCloseForm={this.onCloseForm}
                    task={taskEditing}/>
            : '';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
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
                        <Control/>
                        <br/> {/* Task show full list */}
                        <TaskList
                            tasks={tasks}
                            onUpdateStatus={this.onUpdateStatus}
                            onDeleteTask={this.onDeleteTask}
                            onUpdate={this.onUpdate}/>
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