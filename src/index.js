// list of tasks  - todo - Mock
// Input of new tasks
// task priority
// completed

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../src/style.css';

export class TaskManager extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  _handleKeyDown = todoValue => {
    let todos = [...this.state.todos];
    todos.push(todoValue);
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
      <TaskList todos={this.state.todos} onAddTask={this._handleKeyDown} />
    );
  }
}

export function TaskList(props) {
  return (
    <div>
      <input id="taskData" />
      <button
        onClick={() =>
          props.onAddTask(document.getElementById('taskData').value)
        }
      >
        Add task
      </button>
      {props.todos.map(todo => (
        <Task value={todo} />
      ))}
    </div>
  );
}

export function Task(props) {
  return (
    <div className="task">
      <h6>{props.value}</h6>
    </div>
  );
}

ReactDOM.render(<TaskManager />, document.getElementById('root'));
