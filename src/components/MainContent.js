import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Checkbox, IconButton, Select, MenuItem } from '@mui/material';
import { StarBorder, Star, Delete, Shuffle, Notifications } from '@mui/icons-material';
import axios from 'axios';

const MainContent = ({ tasks, setTasks, filter }) => {
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    axios.get('http://worldclockapi.com/api/json/utc/now')
      .then(response => {
        const dateTime = response.data.currentDateTime;
        setCurrentDate(dateTime.split('T')[0]); // Get only date part
      })
      .catch(error => console.error('Error fetching date:', error));
  }, []);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: Date.now(),
        name: taskInput,
        priority: priority,
        completed: false,
        important: false,
        date: dueDate || currentDate,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      setDueDate('');
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleToggleImportant = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, important: !task.important } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Today') {
      return task.date === currentDate && !task.completed;
    }
    if (filter === 'Important') {
      return task.important && !task.completed;
    }
    return !task.completed;
  });

  const completedTasks = tasks.filter(task => task.completed);

  return (
    <Box sx={{ padding: '20px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Typography variant="h4">To Do</Typography>
        <Box>
          <IconButton><Shuffle /></IconButton>
          <IconButton><Notifications /></IconButton>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          label="Add A Task"
          variant="outlined"
          fullWidth
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          sx={{ marginRight: '10px' }}
        />
        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          sx={{ marginRight: '10px' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          sx={{ marginRight: '10px', width: '120px' }}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
        <Button variant="contained" style={{ backgroundColor: '#B0C4B1' }} onClick={handleAddTask}>
          ADD TASK
        </Button>
      </Box>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>Pending Tasks</Typography>
      <List>
        {filteredTasks.map((task) => (
          <ListItem key={task.id} sx={{ borderBottom: '1px solid #e0e0e0' }}>
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <ListItemText
              primary={
                <Typography style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.name}
                </Typography>
              }
              secondary={`Priority: ${task.priority} | Due: ${task.date}`}
            />
            <IconButton onClick={() => handleDeleteTask(task.id)}>
              <Delete />
            </IconButton>
            <IconButton onClick={() => handleToggleImportant(task.id)}>
              {task.important ? <Star style={{ color: '#FFD700' }} /> : <StarBorder />}
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" sx={{ marginBottom: '10px', marginTop: '20px' }}>Completed</Typography>
      <List>
        {completedTasks.map((task) => (
          <ListItem key={task.id} sx={{ borderBottom: '1px solid #e0e0e0' }}>
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <ListItemText
              primary={
                <Typography style={{ textDecoration: 'line-through' }}>
                  {task.name}
                </Typography>
              }
              secondary={`Priority: ${task.priority} | Due: ${task.date}`}
            />
            <IconButton onClick={() => handleDeleteTask(task.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MainContent;
