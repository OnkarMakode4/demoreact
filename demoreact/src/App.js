import React, { useState } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, newTask.trim()]);
    setNewTask('');
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };
  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index]);
  };
  const handleUpdateTask = () => {
    if (editTask.trim() === '') return;
    const updatedTasks = tasks.map((task, index) =>
      index === editIndex ? editTask.trim() : task
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditTask('');
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <div style={styles.app}>
      <h2>Todo App</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Add your new todo"
          value={editIndex !== null ? editTask : newTask}
          onChange={(e) => {
            if (editIndex !== null) {
              setEditTask(e.target.value);
            } else {
              setNewTask(e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (editIndex !== null) {
                handleUpdateTask();
              } else {
                handleAddTask();
              }
            }
          }}
          style={styles.input}
        />
        <button
          onClick={editIndex !== null ? handleUpdateTask : handleAddTask}
          style={styles.addButton}
          aria-label={editIndex !== null ? 'Update Task' : 'Add Task'}
        >
          {editIndex !== null ? 'Update' : '+'}
        </button>
      </div>

      <ul style={styles.taskList}>
        {tasks.length === 0 && (
          <li style={{ color: '#777' }}>No tasks available</li>
        )}
        {tasks.map((task, index) => (
          <li key={index} style={styles.taskItem}>
            <span style={styles.taskText}>{task}</span>
            <div>
              <button
                onClick={() => handleEditTask(index)}
                style={styles.editButton}
                aria-label="Edit Task"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(index)}
                style={styles.deleteButton}
                aria-label="Delete Task"
              >
                &times;
              </button>
            </div>
          </li>
        ))}
      </ul>

      {tasks.length > 0 && (
        <div style={styles.footer}>
          <span>You have {tasks.length} pending {tasks.length === 1 ? 'task' : 'tasks'}</span>
          <button onClick={handleClearAll} style={styles.clearButton}>
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  app: {
    width: '350px',
    margin: '40px auto',
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.1)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '15px',
  },
  input: {
    flexGrow: 1,
    padding: '10px 12px',
    borderRadius: '4px 0 0 4px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  addButton: {
    backgroundColor: '#4b4de4',
    border: 'none',
    color: '#fff',
    padding: '0 15px',
    cursor: 'pointer',
    fontSize: '20px',
    borderRadius: '0 4px 4px 0',
  },
  taskList: {
    listStyle: 'none',
    paddingLeft: 0,
    marginTop: 0,
    minHeight: '120px',
  },
  taskItem: {
    backgroundColor: '#f8f9fa',
    padding: '12px 15px',
    marginBottom: '8px',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    marginRight: '10px',
    flexGrow: 1,
  },
  editButton: {
    backgroundColor: '#0d6efd',
    border: 'none',
    color: '#fff',
    padding: '5px 8px',
    marginRight: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#c51809ff',
    border: 'none',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  clearButton: {
    backgroundColor: '#6c757d',
    border: 'none',
    color: '#fff',
    padding: '5px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default TodoApp;
