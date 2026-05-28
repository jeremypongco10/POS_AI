import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';

const menuData = [
  { title: 'Admin', icon: <GroupIcon />, path: '/admin' },
  { title: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const UserMenu: React.FC = () => {
  const location = useLocation();
  return (
    <List component="nav" disablePadding>
      {menuData.map((menu) => (
        <ListItemButton
          key={menu.title}
          component={Link}
          to={menu.path}
          selected={location.pathname.startsWith(menu.path)}
          sx={{ pl: 2 }}
        >
          <ListItemIcon>{menu.icon}</ListItemIcon>
          <ListItemText primary={menu.title} />
        </ListItemButton>
      ))}
    </List>
  );
};

export default UserMenu;
