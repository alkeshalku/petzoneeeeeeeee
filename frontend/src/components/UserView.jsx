import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

const UserView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- Edit Modal State ---
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ username: '', email: '', role: '' });

  // Theme Constants
  const ACCENT_COLOR = '#ffeb3b';
  const DARK_BG = '#121212';
  const PAPER_BG = '#1e1e1e';
  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  // --- Fetch Users ---
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get(`${baseURL}/api/users`) // Ensure this matches your backend route
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  };

  // --- Soft Delete / Toggle Disable Handler ---
  const handleToggleStatus = (id, currentStatus) => {
    const action = currentStatus ? "enable" : "disable";
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      axios.delete(`${baseURL}/api/users/${id}`) // Calling the DELETE route which now toggles
        .then((res) => {
          // Update UI locally to reflect change immediately
          setUsers(users.map(user => 
            user._id === id ? { ...user, isDisabled: res.data.isDisabled } : user
          ));
        })
        .catch((err) => console.error("Error updating user status:", err));
    }
  };

  // --- Edit Handlers ---
  const handleEditClick = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUser({ fname: '', email: '', role: '' });
  };

  const handleSaveUser = () => {
    axios.put(`${baseURL}/api/users/${currentUser._id}`, currentUser)
      .then((res) => {
        // Update the specific user in the list
        setUsers(users.map(user => (user._id === currentUser._id ? res.data.user : user)));
        handleClose();
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: DARK_BG, padding: 4, color: 'white' }}>
      <Typography variant="h4" gutterBottom sx={{ color: ACCENT_COLOR, fontWeight: 'bold', mb: 4, textAlign:'center' }}>
        USER MANAGEMENT
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress sx={{ color: ACCENT_COLOR }} />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: PAPER_BG, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#333' }}>
                <TableCell sx={{ color: ACCENT_COLOR, fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: ACCENT_COLOR, fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: ACCENT_COLOR, fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ color: ACCENT_COLOR, fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: ACCENT_COLOR, fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow 
                  key={user._id} 
                  sx={{ 
                    opacity: user.isDisabled ? 0.5 : 1, // Dim row if disabled
                    backgroundColor: user.isDisabled ? '#2a1a1a' : 'transparent',
                    '&:last-child td, &:last-child th': { border: 0 } 
                  }}
                >
                  <TableCell sx={{ color: 'white' }}>{user.fname || user.name}</TableCell>
                  <TableCell sx={{ color: '#b0b0b0' }}>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role || 'user'} 
                      size="small"
                      sx={{ 
                        backgroundColor: user.role === 'admin' ? ACCENT_COLOR : '#444',
                        color: user.role === 'admin' ? 'black' : 'white',
                        fontWeight: 'bold'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                     <Chip 
                       label={user.isDisabled ? "Disabled" : "Active"}
                       color={user.isDisabled ? "error" : "success"}
                       size="small"
                       variant="outlined"
                     />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                        <Button 
                            variant="contained" 
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleEditClick(user)}
                            disabled={user.isDisabled} // Cannot edit disabled users
                            sx={{ backgroundColor: ACCENT_COLOR, color: 'black', fontWeight: 'bold', '&:hover': { backgroundColor: '#ffee58' } }}
                        >
                            Edit
                        </Button>

                        <Button 
                            variant="contained" 
                            size="small"
                            color={user.isDisabled ? "success" : "error"} // Green to enable, Red to disable
                            startIcon={user.isDisabled ? <RestoreFromTrashIcon /> : <DeleteIcon />}
                            onClick={() => handleToggleStatus(user._id, user.isDisabled)}
                            disabled={user.role === 'admin'} 
                            sx={{ fontWeight: 'bold' }}
                        >
                            {user.isDisabled ? "Enable" : "Disable"}
                        </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* --- EDIT USER DIALOG (MODAL) --- */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Username"
            fullWidth
            value={currentUser.username || currentUser.name || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={currentUser.email || ''}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              value={currentUser.role || 'user'}
              label="Role"
              onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UserView;