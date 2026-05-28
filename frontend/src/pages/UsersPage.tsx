import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { Edit, Close, Add } from '@mui/icons-material';

// User type
interface UserRecord {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Locked';
  department: string;
  location: string;
}



const emptyUser: Omit<UserRecord, 'id'> = {
  name: '',
  username: '',
  email: '',
  role: 'Employee',
  status: 'Active',
  department: '',
  location: '',
};


const API_URL = '/api/users';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyUser);
  const [loading, setLoading] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (e) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openCreateDialog = () => {
    setEditingUserId(null);
    setForm(emptyUser);
    setDialogOpen(true);
  };

  const openEditDialog = (user: UserRecord) => {
    setEditingUserId(user.id);
    setForm({
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status,
      department: user.department,
      location: user.location,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  const saveUser = async () => {
    if (!form.name || !form.username || !form.email) return;
    try {
      if (editingUserId === null) {
        // Create
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      } else {
        // Update
        await fetch(`${API_URL}/${editingUserId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }
      fetchUsers();
      closeDialog();
    } catch (e) {
      // handle error
    }
  };

  const deleteUser = async (id: number) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchUsers();
    } catch (e) {}
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4.5 }, pb: 5 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { xs: 'stretch', md: 'center' }, justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography sx={{ color: '#607086', fontSize: 13, fontWeight: 700, mb: 0.5 }}>
            Admin
          </Typography>
          <Typography variant="h1" sx={{ color: '#000000', fontSize: { xs: 30, md: 38 }, fontWeight: 400 }}>
            User Maintenance
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={openCreateDialog} sx={{ minHeight: 42, borderRadius: 8, px: 2.5, bgcolor: '#002855', color: '#fff', boxShadow: '0 4px 10px rgba(0, 40, 85, 0.25)', '&:hover': { bgcolor: '#001f44' } }}>
          New User
        </Button>
      </Stack>
      <Card elevation={0} sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 720 }} aria-label="User maintenance table">
            <TableHead>
              <TableRow sx={{ bgcolor: '#f7f8fb' }}>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow hover key={user.id}>
                  <TableCell>
                    <Typography sx={{ color: '#001a3a', fontWeight: 700 }}>{user.name}</Typography>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Chip label={user.status} size="small" sx={{ bgcolor: user.status === 'Active' ? '#e8f5ed' : user.status === 'Locked' ? '#fff0f2' : '#eef1f5', color: user.status === 'Active' ? '#217a39' : user.status === 'Locked' ? '#b4233f' : '#607086', fontWeight: 700 }} />
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label={`Edit ${user.name}`} onClick={() => openEditDialog(user)}>
                      <Edit sx={{ color: '#002855' }} />
                    </IconButton>
                    <IconButton aria-label={`Delete ${user.name}`} onClick={() => deleteUser(user.id)}>
                      <Close sx={{ color: '#b4233f' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ color: '#607086', py: 6 }}>
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ color: '#607086', py: 6 }}>
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ pr: 7 }}>
          {editingUserId === null ? 'Create User' : 'Edit User'}
          <IconButton aria-label="Close dialog" onClick={closeDialog} sx={{ position: 'absolute', right: 12, top: 12 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'grid', gap: 2, pt: 1 }}>
            <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <TextField label="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
            <TextField label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <TextField label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            <TextField select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as UserRecord['status'] })}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Locked">Locked</MenuItem>
            </TextField>
            <TextField label="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
            <TextField label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={saveUser} sx={{ minHeight: 42, borderRadius: 8, px: 2.5, bgcolor: '#002855', color: '#fff', boxShadow: '0 4px 10px rgba(0, 40, 85, 0.25)', '&:hover': { bgcolor: '#001f44' } }}>
            Save User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
