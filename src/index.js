// list of tasks  - todo - Mock
// Input of new tasks
// task priority
// completed

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../src/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class TaskManager extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  _handleKeyDown = todoValue => {
    let todos = [...this.state.todos];
    let todo_obj = {
      key: this.state.todos.length,
      id: this.state.todos.length,
      title: todoValue,
      isCompleted: false
    };
    todos.push(todo_obj);
    console.log(todo_obj);
    this.setState({ todos });
  };

  _handleDelete = todoValue => {
    let todos = [...this.state.todos];
    todos = todos.filter(todo => todo.id != todoValue);
    this.setState({ todos });
  };

  _handleComplete = todoValue => {
    let todos = [...this.state.todos];
    todos.map(todo => {
      if (todo.id == todoValue && todo.isCompleted == false) {
        todo.isCompleted = true;
      } else if (todo.id == todoValue && todo.isCompleted == true) {
        todo.isCompleted = false;
      }
    });
    this.setState({ todos });
  };
  // componentDidMount() {
  //   fetch('https://mocki.io/v1/343df756-69ef-4af9-baeb-5b461a97cef8', {
  //     mode: 'cors' // 'cors' by default
  //   })
  //     .then(response => response.json())
  //     .then(todos => this.setState({ todos: todos }));
  // }

  render() {
    return (
      <React.Fragment>
        <h5 className="m-3">Simple Todo</h5>
        <TaskList
          todos={this.state.todos}
          onAddTask={this._handleKeyDown}
          onDeleteTask={this._handleDelete}
          isCompleted={this._handleComplete}
        />
      </React.Fragment>
    );
  }
}

export function TaskList(props) {
  return (
    <div className="m-2">
      <div class="input-group ">
        <input
          type="text"
          id="taskData"
          class="form-control"
          onblur="this.value=''"
          placeholder="Enter the task"
        />
        <button
          class="btn btn-primary"
          type="button"
          id="button-addon2"
          onClick={() => {
            props.onAddTask(document.getElementById('taskData').value);
            const notify = () => toast('Wow so easy!');
            notify();
            document.getElementById('taskData').value = '';
          }}
        >
          Add task
        </button>
      </div>

      {props.todos.map(todo => (
        <Task
          value={todo}
          onDelete={props.onDeleteTask}
          isCompleted={props.isCompleted}
        />
      ))}
    </div>
  );
}

export function Task(props) {
  const styles = () => {
    if (props.value.isCompleted === true) {
      return { textDecorationLine: 'line-through' };
    }
    return;
  };

  const completedClass = () => {
    if (props.value.isCompleted === false) {
      return 'fa fa-check';
    }
    return 'fa fa-times';
  };
  return (
    <div className="card m-3">
      <div className="p-1">
        <label className="m-2" style={styles()}>
          {props.value.title}
        </label>
        <button
          className="btn btn-danger trash m-1"
          onClick={() => props.onDelete(props.value.id)}
        >
          <i className="fa fa-trash" />
        </button>
        <button
          className="btn btn-success check m-1"
          onClick={() => props.isCompleted(props.value.id)}
        >
          <i className={completedClass()} />
        </button>
      </div>
    </div>
  );
}

ReactDOM.render(<TaskManager />, document.getElementById('root'));
