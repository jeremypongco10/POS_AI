
import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { Edit, Close, Add } from '@mui/icons-material';

// Role type
interface RoleRecord {
  id: number;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}



const emptyRole: Omit<RoleRecord, 'id'> = {
  name: '',
  description: '',
  status: 'Active',
};


const API_URL = 'http://localhost:8080/POS_AI/backend/public/api/roles';

const RolePage: React.FC = () => {
  const [roles, setRoles] = useState<RoleRecord[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyRole);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  // Fetch roles from API
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API error:', res.status, errorText);
        setRoles([]);
        return;
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error('API did not return an array:', data);
        setRoles([]);
        return;
      }
      // Map 'inactive' to 'status'
      const mapped = data.map((role: any) => ({
        id: role.rolesid || role.id,
        name: role.name,
        description: role.description,
        status: (String(role.inactive) === '1' ? 'Inactive' : 'Active') as 'Active' | 'Inactive',
      }));
      setRoles(mapped);
    } catch (e) {
      console.error('Error fetching roles:', e);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const openCreateDialog = () => {
    setEditingRoleId(null);
    setForm(emptyRole);
    setDialogOpen(true);
  };

  const openEditDialog = (role: RoleRecord) => {
    setEditingRoleId(role.id);
    setForm({ name: role.name, description: role.description, status: role.status });
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    // name: required|min_length[2]|max_length[100]
    if (!form.name || form.name.trim().length === 0) {
      newErrors.name = 'Role name is required.';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Role name must be at least 2 characters.';
    } else if (form.name.length > 100) {
      newErrors.name = 'Role name must not exceed 100 characters.';
    }
    // description: permit_empty|max_length[255]
    if (form.description && form.description.length > 255) {
      newErrors.description = 'Description must not exceed 255 characters.';
    }
    // status: in_list[0,1] (handled as dropdown, so always valid)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveRole = async () => {
    if (!validate()) return;
    const payload = {
      name: form.name,
      description: form.description,
      inactive: form.status === 'Inactive' ? 1 : 0,
    };
    try {
      let res;
      if (editingRoleId === null) {
        res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_URL}/${editingRoleId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      const result = await res.json();
      if (result.isSuccess) {
        setMessage({ type: 'success', text: editingRoleId === null ? 'Role added successfully.' : 'Role updated successfully.' });
        fetchRoles();
        closeDialog();
      } else {
        setMessage({ type: 'error', text: result.errormessage || 'Failed to save role.' });
        if (result.messages && result.messages.name) {
          setErrors((prev) => ({ ...prev, name: result.messages.name }));
        }
      }
    } catch (e) {
      setMessage({ type: 'error', text: 'Error saving role.' });
      console.error('Error saving role:', e);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteTargetId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteTargetId(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId === null) return;
    try {
      const res = await fetch(`${API_URL}/${deleteTargetId}`, { method: 'DELETE' });
      const result = await res.json();
      if (result.isSuccess) {
        setMessage({ type: 'success', text: 'Role deleted successfully.' });
        fetchRoles();
      } else {
        setMessage({ type: 'error', text: result.errormessage || 'Failed to delete role.' });
      }
    } catch (e) {
      setMessage({ type: 'error', text: 'Error deleting role.' });
      console.error('Error deleting role:', e);
    } finally {
      setDeleteDialogOpen(false);
      setDeleteTargetId(null);
    }
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4.5 }, pb: 5 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ alignItems: { xs: 'stretch', md: 'center' }, justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography sx={{ color: '#607086', fontSize: 13, fontWeight: 700, mb: 0.5 }}>
            Admin
          </Typography>
          <Typography variant="h1" sx={{ color: '#000000', fontSize: { xs: 30, md: 38 }, fontWeight: 400 }}>
            Role Maintenance
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={openCreateDialog} sx={{ minHeight: 42, borderRadius: 8, px: 2.5, bgcolor: '#002855', color: '#fff', boxShadow: '0 4px 10px rgba(0, 40, 85, 0.25)', '&:hover': { bgcolor: '#001f44' } }}>
          New Role
        </Button>
      </Stack>
      {message && (
        <Box sx={{ mb: 2 }}>
          <Card sx={{ bgcolor: message.type === 'success' ? '#e8f5ed' : '#ffebee', color: message.type === 'success' ? '#217a39' : '#b4233f', px: 2, py: 1 }}>
            {message.text}
          </Card>
        </Box>
      )}
      <Card elevation={0} sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 720 }} aria-label="Role maintenance table">
            <TableHead>
              <TableRow sx={{ bgcolor: '#f7f8fb' }}>
                <TableCell>Role</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow hover key={role.id}>
                  <TableCell>
                    <Typography sx={{ color: '#001a3a', fontWeight: 700 }}>{role.name}</Typography>
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <Chip label={role.status} size="small" sx={{ bgcolor: role.status === 'Active' ? '#e8f5ed' : '#eef1f5', color: role.status === 'Active' ? '#217a39' : '#607086', fontWeight: 700 }} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label={`Edit ${role.name}`} onClick={() => openEditDialog(role)}>
                      <Edit sx={{ color: '#002855' }} />
                    </IconButton>
                    <IconButton aria-label={`Delete ${role.name}`} onClick={() => handleDeleteClick(role.id)}>
                      <Close sx={{ color: '#b4233f' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ color: '#607086', py: 6 }}>
                    Loading roles...
                  </TableCell>
                </TableRow>
              ) : roles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ color: '#607086', py: 6 }}>
                    No roles found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ pr: 7 }}>
          {editingRoleId === null ? 'Create Role' : 'Edit Role'}
          <IconButton aria-label="Close dialog" onClick={closeDialog} sx={{ position: 'absolute', right: 12, top: 12 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'grid', gap: 2, pt: 1 }}>
            <TextField
              label="Role Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              multiline
              minRows={2}
              error={!!errors.description}
              helperText={errors.description}
            />
            <TextField select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'Active' | 'Inactive' })}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={saveRole} sx={{ minHeight: 42, borderRadius: 8, px: 2.5, bgcolor: '#002855', color: '#fff', boxShadow: '0 4px 10px rgba(0, 40, 85, 0.25)', '&:hover': { bgcolor: '#001f44' } }}>
            Save Role
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this role?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RolePage;
