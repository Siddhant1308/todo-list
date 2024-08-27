import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Avatar, ListItemIcon } from '@mui/material';
import { Assignment, Star, CalendarToday, Person } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

// Custom function to display a styled CircularProgress with a label
function CircularProgressWithLabel({ value }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={80}
        thickness={5}
        style={{ color: '#4caf50' }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const Sidebar = ({ tasks, setFilter }) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#F8F8F8',
        padding: '20px',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      {/* User Profile Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Avatar alt="User Profile" src="https://via.placeholder.com/150" sx={{ marginRight: '10px' }} />
        <Typography variant="h6">Hey, ABCD</Typography>
      </Box>

      {/* Navigation List */}
      <List sx={{ flexGrow: 0, marginBottom: '20px' }}>
        <ListItem button onClick={() => setFilter('All Tasks')}>
          <ListItemIcon><Assignment /></ListItemIcon>
          <ListItemText primary="All Tasks" />
        </ListItem>
        <ListItem button onClick={() => setFilter('Today')}>
          <ListItemIcon><CalendarToday /></ListItemIcon>
          <ListItemText primary="Today" />
        </ListItem>
        <ListItem button onClick={() => setFilter('Important')}>
          <ListItemIcon><Star /></ListItemIcon>
          <ListItemText primary="Important" />
        </ListItem>
        <ListItem button onClick={() => setFilter('Assigned')}>
          <ListItemIcon><Person /></ListItemIcon>
          <ListItemText primary="Assigned to me" />
        </ListItem>
      </List>

      {/* Today's Tasks Circular Progress */}
      <Box
        sx={{
          textAlign: 'center',
          padding: '20px',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          marginTop: 'auto',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>Today Tasks</Typography>
        <CircularProgressWithLabel value={progress} />
        <Typography variant="caption">{`${completedTasks} of ${totalTasks} tasks completed`}</Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
