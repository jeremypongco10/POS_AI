
import React, { useState } from 'react';
import { Box, Tabs, Tab, Paper } from '@mui/material';


import UsersPage from './UsersPage';
import RolePage from './RolePage';
import StorePage from './StorePage';
import BranchStorePage from './BranchStorePage';

const tabList = [
  { label: 'Users', component: <UsersPage /> },
  { label: 'Roles', component: <RolePage /> },
  { label: 'Stores', component: <StorePage /> },
  { label: 'Branch Stores', component: <BranchStorePage /> },
  // Add more tabs here as needed, e.g. Permissions, etc.
];

const AdminPage: React.FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ px: { xs: 2, md: 4.5 }, py: 3, position: 'relative' }}>
      {/* Improved Background Card */}
      <Paper elevation={2} sx={{
        width: '100%',
        minHeight: 100,
        borderRadius: 3,
        bgcolor: '#eaf1fa',
        mb: 4,
        px: { xs: 2, md: 4 },
        py: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Box>
          <Box sx={{ fontWeight: 700, fontSize: 26, color: '#002855', mb: 0.5 }}>Admin Center</Box>
          <Box sx={{ color: '#607086', fontSize: 16 }}>Manage users, roles, and permissions</Box>
        </Box>
      </Paper>
      {/* Tabs and Content */}
      <Paper elevation={0} sx={{ borderRadius: 2, mb: 3, bgcolor: '#f7f8fb' }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabList.map((t, i) => (
            <Tab key={t.label} label={t.label} />
          ))}
        </Tabs>
      </Paper>
      <Box>
        <Paper elevation={1} sx={{ borderRadius: 3, px: 0, py: 3, bgcolor: '#fff', minHeight: 400 }}>
          {tabList[tab].component}
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminPage;
