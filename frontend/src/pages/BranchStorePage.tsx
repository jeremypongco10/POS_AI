import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material';
import { Edit, Close, Add } from '@mui/icons-material';

interface BranchStoreRecord {
  id: number;
  storeid: number;
  branch_name: string;
  address: string;
  contact_number: string;
  email: string;
  status: 'Active' | 'Inactive';
}

const emptyBranchStore: Omit<BranchStoreRecord, 'id'> = {
  storeid: 0,
  branch_name: '',
  address: '',
  contact_number: '',
  email: '',
  status: 'Active',
};

const API_URL = 'http://localhost:8080/POS_AI/backend/public/api/branchstores';
const STORE_API_URL = 'http://localhost:8080/POS_AI/backend/public/api/stores';

const BranchStorePage: React.FC = () => {
  const [branchStores, setBranchStores] = useState<BranchStoreRecord[]>([]);
  const [stores, setStores] = useState<{ id: number; name: string }[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBranchStoreId, setEditingBranchStoreId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyBranchStore);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const fetchBranchStores = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const mapped = Array.isArray(data)
        ? data.map((item: any) => ({
            id: item.branchstoreid || item.id,
            storeid: item.storeid,
            branch_name: item.branch_name,
            address: item.address,
            contact_number: item.contact_number,
            email: item.email,
            status: (String(item.inactive) === '1' ? 'Inactive' : 'Active') as 'Active' | 'Inactive',
          }))
        : [];
      setBranchStores(mapped);
    } catch (e) {
      setBranchStores([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStores = async () => {
    try {
      const res = await fetch(STORE_API_URL);
      const data = await res.json();
      setStores(
        Array.isArray(data)
          ? data.map((item: any) => ({ id: item.storeid || item.id, name: item.name }))
          : []
      );
    } catch (e) {
      setStores([]);
    }
  };

  useEffect(() => {
    fetchBranchStores();
    fetchStores();
  }, []);

  const openCreateDialog = () => {
    setEditingBranchStoreId(null);
    setForm(emptyBranchStore);
    setDialogOpen(true);
  };

  const openEditDialog = (branch: BranchStoreRecord) => {
    setEditingBranchStoreId(branch.id);
    setForm({
      storeid: branch.storeid,
      branch_name: branch.branch_name,
      address: branch.address,
      contact_number: branch.contact_number,
      email: branch.email,
      status: branch.status,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.storeid || form.storeid === 0) {
      newErrors.storeid = 'Store is required.';
    }
    if (!form.branch_name || form.branch_name.trim().length === 0) {
      newErrors.branch_name = 'Branch name is required.';
    } else if (form.branch_name.trim().length < 2) {
      newErrors.branch_name = 'Branch name must be at least 2 characters.';
    } else if (form.branch_name.length > 100) {
      newErrors.branch_name = 'Branch name must not exceed 100 characters.';
    }
    if (form.address && form.address.length > 255) {
      newErrors.address = 'Address must not exceed 255 characters.';
    }
    if (form.contact_number && form.contact_number.length > 50) {
      newErrors.contact_number = 'Contact number must not exceed 50 characters.';
    }
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

  const saveBranchStore = async () => {
    if (!validate()) return;
    const payload = {
      storeid: form.storeid,
      branch_name: form.branch_name,
      address: form.address,
      contact_number: form.contact_number,
      email: form.email,
      inactive: form.status === 'Inactive' ? 1 : 0,
    };
    try {
      let res;
      if (editingBranchStoreId === null) {
        res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_URL}/${editingBranchStoreId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      const result = await res.json();
      if (result.isSuccess) {
        setMessage({ type: 'success', text: editingBranchStoreId === null ? 'Branch store added successfully.' : 'Branch store updated successfully.' });
        fetchBranchStores();
        closeDialog();
      } else {
        setMessage({ type: 'error', text: result.errormessage || 'Failed to save branch store.' });
        if (result.messages) {
          setErrors((prev) => ({ ...prev, ...result.messages }));
        }
      }
    } catch (e) {
      setMessage({ type: 'error', text: 'Error saving branch store.' });
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
        setMessage({ type: 'success', text: 'Branch store deleted successfully.' });
        fetchBranchStores();
      } else {
        setMessage({ type: 'error', text: result.errormessage || 'Failed to delete branch store.' });
      }
    } catch (e) {
      setMessage({ type: 'error', text: 'Error deleting branch store.' });
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
            Branch Store Maintenance
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={openCreateDialog} sx={{ minHeight: 42, borderRadius: 8, px: 2.5, bgcolor: '#002855', color: '#fff', boxShadow: '0 4px 10px rgba(0, 40, 85, 0.25)', '&:hover': { bgcolor: '#001f44' } }}>
          New Branch Store
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
          <Table sx={{ minWidth: 720 }} aria-label="Branch Store maintenance table">
            <TableHead>
              <TableRow sx={{ bgcolor: '#f7f8fb' }}>
                <TableCell>Store</TableCell>
                <TableCell>Branch Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branchStores.map((branch) => (
                <TableRow hover key={branch.id}>
                  <TableCell>{stores.find((s) => s.id === branch.storeid)?.name || branch.storeid}</TableCell>
                  <TableCell>{branch.branch_name}</TableCell>
                  <TableCell>{branch.address}</TableCell>
                  <TableCell>{branch.contact_number}</TableCell>
                  <TableCell>{branch.email}</TableCell>
                  <TableCell>
                    <Chip label={branch.status} size="small" sx={{ bgcolor: branch.status === 'Active' ? '#e8f5ed' : '#eef1f5', color: branch.status === 'Active' ? '#217a39' : '#607086', fontWeight: 700 }} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton aria-label={`Edit ${branch.branch_name}`} onClick={() => openEditDialog(branch)}>
                      <Edit sx={{ color: '#002855' }} />
                    </IconButton>
                    <IconButton aria-label={`Delete ${branch.branch_name}`} onClick={() => handleDeleteClick(branch.id)}>
                      <Close sx={{ color: '#b4233f' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ color: '#607086', py: 6 }}>
                    Loading branch stores...
                  </TableCell>
                </TableRow>
              ) : branchStores.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ color: '#607086', py: 6 }}>
                    No branch stores found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ pr: 7 }}>
          {editingBranchStoreId === null ? 'Create Branch Store' : 'Edit Branch Store'}
          <IconButton aria-label="Close dialog" onClick={closeDialog} sx={{ position: 'absolute', right: 12, top: 12 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'grid', gap: 2, pt: 1 }}>
            <TextField
              select
              label="Store"
              value={form.storeid}
              onChange={(e) => setForm({ ...form, storeid: Number(e.target.value) })}
              required
              error={!!errors.storeid}
              helperText={errors.storeid}
            >
              <MenuItem value={0}>Select Store</MenuItem>
              {stores.map((store) => (
                <MenuItem key={store.id} value={store.id}>{store.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Branch Name"
              value={form.branch_name}
              onChange={(e) => setForm({ ...form, branch_name: e.target.value })}
              required
              error={!!errors.branch_name}
              helperText={errors.branch_name}
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
          <Button variant="contained" onClick={saveBranchStore} sx={{ minHeight: 42, borderRadius: 8, px: 2.5, bgcolor: '#002855', color: '#fff', boxShadow: '0 4px 10px rgba(0, 40, 85, 0.25)', '&:hover': { bgcolor: '#001f44' } }}>
            Save Branch Store
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Branch Store</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this branch store?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BranchStorePage;
