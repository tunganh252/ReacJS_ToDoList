import React, { Component } from 'react';
import TaskForm from '../Components/TaskForm'
import Control from '../Components/Control'
import TaskList from '../Components/TaskList'
import '../App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],  // id:unique, name, status
			showTaskForm: false,
		}
	}
	// Toggle Form (show/hide)
	onToggleForm = () => {
		this.setState({
			showTaskForm: !this.state.showTaskForm
		})
	}
	onCloseForm = () => {
		this.setState({
			showTaskForm: false
		});
	}

	// lifecycle
	componentWillMount() {
		if (localStorage && localStorage.getItem('tasks')) {
			let tasks = JSON.parse(localStorage.getItem('tasks'))
			this.setState({
				tasks: tasks
			});
		}
	}
	// Tạo random ID
	s4 = () => {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}

	generateID = () => {
		return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
	}
	// End random ID 

	onSubmit = (data) => {
		let { tasks } = this.state;
		data.id = this.generateID();
		tasks.push(data)
		this.setState({
			tasks: tasks
		});
		localStorage.setItem('tasks', JSON.stringify(tasks));

	}

	render() {
		let { tasks, showTaskForm } = this.state; /// let tasks = this.state.tasks
		let elmShowTaskForm = showTaskForm ? <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} /> : '';
		return (
			<div className="container">
				<div className="text-center">
					<h1>Quản Lý Công Việc</h1>
					<hr />
				</div>
				<div className="row">
					<div className={showTaskForm ? 'col-md-4' : ''}>
						{/* TaskForm */}
						{elmShowTaskForm}
					</div>
					<div className={showTaskForm ? 'col-md-8' : 'col-md-12'}>
						<button onClick={() => this.onToggleForm()} type="button"
							className="btn btn-primary">
							<span className="fa fa-plus mr-5"></span>
							Thêm Công Việc
						</button>
						{/* Search + Sortable */}
						<Control />
						<br />
						{/* Task show full list */}
						<TaskList tasks={tasks} />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
	// Generate data (set cứng): Dùng cho ban đầu tạo mẫu

	// onGenerateData = () => {
	// 	let tasks = [
	// 		{
	// 			id: this.generateID(),
	// 			name: 'Học lập trình',
	// 			status: true
	// 		},
	// 		{
	// 			id: this.generateID(),
	// 			name: 'Học võ',
	// 			status: false
	// 		},
	// 		{
	// 			id: this.generateID(),
	// 			name: 'Đi bơi',
	// 			status: true
	// 		}

	// 	];
	// 	this.setState({
	// 		tasks: tasks
	// 	});
	// 	localStorage.setItem('tasks', JSON.stringify(tasks));

	// }
	// onSubmit nhận thông tin từ taskForm và push lên tasks