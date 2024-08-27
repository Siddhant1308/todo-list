import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const TaskInput = () => {
  const [task, setTask] = useState('');

  const handleAddTask = () => {
    if (task.trim()) {
      // Dispatch an action to add the task (to be implemented with Redux)
      console.log('Adding task:', task);
      setTask(''); // Clear input field after adding
    }
  };

  return (
    <Box sx={{ marginTop: 3, marginBottom: 2 }}>
      <TextField
        label="New Task"
        variant="outlined"
        fullWidth
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '10px', backgroundColor: '#B0C4B1' }}
        onClick={handleAddTask}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TaskInput;
