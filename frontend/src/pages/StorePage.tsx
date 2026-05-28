import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { Edit, Close, Add } from '@mui/icons-material';

interface StoreRecord {
  id: number;
  name: string;
  address: string;
  contact_number: string;
  email: string;
  status: 'Active' | 'Inactive';
}

const emptyStore: Omit<StoreRecord, 'id'> = {
  name: '',
  address: '',
  contact_number: '',
  email: '',
  status: 'Active',
};

const API_URL = 'http://localhost:8080/POS_AI/backend/public/api/stores';

const StorePage: React.FC = () => {
  const [stores, setStores] = useState<StoreRecord[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStoreId, setEditingStoreId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyStore);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API error:', res.status, errorText);
        setStores([]);
        return;
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error('API did not return an array:', data);
        setStores([]);
        return;
      }
      const mapped = data.map((store: any) => ({
        id: store.storeid || store.id,
        name: store.name,
        address: store.address,
        contact_number: store.contact_number,
        email: store.email,
        status: (String(store.inactive) === '1' ? 'Inactive' : 'Active') as 'Active' | 'Inactive',
      }));
      setStores(mapped);
    } catch (e) {
      console.error('Error fetching stores:', e);
      setStores([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const openCreateDialog = () => {
    setEditingStoreId(null);
    setForm(emptyStore);
    setDialogOpen(true);
  };

  const openEditDialog = (store: StoreRecord) => {
    setEditingStoreId(store.id);
    setForm({
      name: store.name,
      address: store.address,
      contact_number: store.contact_number,
      email: store.email,
      status: store.status,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    // name: required|min_length[2]|max_length[100]
    if (!form.name || form.name.trim().length === 0) {
      newErrors.name = 'Store name is required.';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Store name must be at least 2 characters.';
    } else if (form.name.length > 100) {
      newErrors.name = 'Store name must not exceed 100 characters.';
    }
    // address: permit_empty|max_length[255]
    if (form.address && form.address.length > 255) {
      newErrors.address = 'Address must not exceed 255 characters.';
    }
    // contact_number: permit_empty|max_length[50]
    if (form.contact_number && form.contact_number.length > 50) {
      newErrors.contact_number = 'Contact number must not exceed 50 characters.';
    }
    // email: permit_empty|valid_email|max_length[100]
    if (form.email) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
        newErrors.email = 'Please enter a valid email address.';
      } else if (form.email.length > 100) {
        newErrors.email = 'Email must not exceed 100 characters.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveStore = async () => {
    if (!validate()) return;
    const payload = {
      name: form.name,
      address: form.address,
      contact_number: form.contact_number,
      email: form.email,
      inactive: form.status === 'Inactive' ? 1 : 0,
    };
    try {
      let res;
      if (editingStoreId === null) {
        res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_URL}/${editingStoreId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      const result = await res.json();
      if (result.isSuccess) {
        setMessage({ type: 'success', text: editingStoreId === null ? 'Store added successfully.' : 'Store updated successfully.' });
        fetchStores();
        closeDialog();
      } else {
        setMessage({ type: 'error', text: result.errormessage || 'Failed to save store.' });
        if (result.messages) {
          // Show backend validation errors under the correct fields
          setErrors((prev) => ({ ...prev, ...result.messages }));
        }
      }
    } catch (e) {
      setMessage({ type: 'error', text: 'Error saving store.' });
      console.error('Error saving store:', e);
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
        setMessage({ type: 'success', text: 'Store deleted successfully.' });
        fetchStores();
      } else {
        setMessage({ type: 'error', text: result.errormessage || 'Failed to delete store.' });
      }
    } catch (e) {
      setMessage({ type: 'error', text: 'Error deleting store.' });
      console.error('Error deleting store:', e);
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
            Store Maintenance
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={openCreateDialog} sx={{ minHeight: 42, borderRadius: 8, px: 2.5, bgcolor: '#002855', color: '#fff', boxShadow: '0 4px 10px rgba(0, 40, 85, 0.25)', '&:hover': { bgcolor: '#001f44' } }}>
          New Store
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
          <Table sx={{ minWidth: 720 }} aria-label="Store maintenance table">
            <TableHead>
              <TableRow sx={{ bgcolor: '#f7f8fb' }}>
                <TableCell>Store Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stores.map((store) => (
                <TableRow hover key={store.id}>
                  <TableCell>
                    <Typography sx={{ color: '#001a3a', fontWeight: 700 }}>{store.name}</Typography>
                  </TableCell>
                  <TableCell>{store.address}</TableCell>
                  <TableCell>{store.contact_number}</TableCell>
                  <TableCell>{store.email}</TableCell>
                  <TableCell>
                    <Chip label={store.status} size="small" sx={{ bgcolor: store.status === 'Active' ? '#e8f5ed' : '#eef1f5', color: store.status === 'Active' ? '#217a39' : '#607086', fontWeight: 700 }} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label={`Edit ${store.name}`} onClick={() => openEditDialog(store)}>
                      <Edit sx={{ color: '#002855' }} />
                    </IconButton>
                    <IconButton aria-label={`Delete ${store.name}`} onClick={() => handleDeleteClick(store.id)}>
                      <Close sx={{ color: '#b4233f' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ color: '#607086', py: 6 }}>
                    Loading stores...
                  </TableCell>
                </TableRow>
              ) : stores.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ color: '#607086', py: 6 }}>
                    No stores found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ pr: 7 }}>
          {editingStoreId === null ? 'Create Store' : 'Edit Store'}
          <IconButton aria-label="Close dialog" onClick={closeDialog} sx={{ position: 'absolute', right: 12, top: 12 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'grid', gap: 2, pt: 1 }}>
            <TextField
              label="Store Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              error={!!errors.address}
              helperText={errors.address}
            />
            <TextField
              label="Contact Number"
              value={form.contact_number}
              onChange={(e) => setForm({ ...form, contact_number: e.target.value })}
              error={!!errors.contact_number}
              helperText={errors.contact_number}
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'Active' | 'Inactive' })}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={saveStore} sx={{ minHeight: 42, borderRadius: 8, px: 2.5, bgcolor: '#002855', color: '#fff', boxShadow: '0 4px 10px rgba(0, 40, 85, 0.25)', '&:hover': { bgcolor: '#001f44' } }}>
            Save Store
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Store</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this store?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StorePage;
