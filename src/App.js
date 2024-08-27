import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All Tasks');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Grid container>
      <Grid item xs={3}>
        <Sidebar tasks={tasks} setFilter={setFilter} />
      </Grid>
      <Grid item xs={9}>
        <MainContent tasks={tasks} setTasks={setTasks} filter={filter} />
      </Grid>
    </Grid>
  );
};

export default App;
