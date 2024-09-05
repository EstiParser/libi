import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Grid, CircularProgress, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function Users() {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const tokenn = localStorage.getItem('token');
    if (!tokenn) {
      console.error('No token found');
      setLoading(false);
      return;
    }
    setToken(tokenn);
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!token) return;

      try {
        const result = await axios.get('http://127.0.0.1:5000/users/get', {
          headers: {
            authorization: token,
          },
        });

        console.log('Response from server:', result.data);

        if (Array.isArray(result.data)) {
          setResponse(result.data);
        } else if (Array.isArray(result.data.data)) {
          setResponse(result.data.data);
        } else {
          console.error('No users array found in the response', result.data);
        }
      } catch (error) {
        console.error('Error fetching user details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/users/delete/${id}`, {
        headers: { authorization: token },
      });
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleUpdate = (user) => {
    setEditUser({ ...user });
    setOpenPopup(true);
  };

  const handleSaveUpdate = async () => {
    if (!editUser) return;

    try {
      await axios.put(`http://127.0.0.1:5000/users/update/${editUser.id}`, {
        name: editUser.name,
        email: editUser.email,
        permission: editUser.permission,
      }, {
        headers: { authorization: token },
      });
      await fetchUsers();
      setOpenPopup(false);
      setEditUser(null);
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const fetchUsers = async () => {
    if (!token) return;

    try {
      const result = await axios.get('http://127.0.0.1:5000/users/get', {
        headers: {
          authorization: token,
        },
      });

      console.log('Fetch users response:', result.data);

      if (Array.isArray(result.data)) {
        setResponse(result.data);
      } else if (Array.isArray(result.data.data)) {
        setResponse(result.data.data);
      } else {
        console.error('No users array found in the response', result.data);
      }
    } catch (error) {
      console.error('Error fetching user details', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          {response.length > 0 ? (
            response.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card sx={{ padding: '16px', boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ marginBottom: '8px' }}>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      דוא"ל: {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      הרשאה: {user.permission}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                      <IconButton onClick={() => handleUpdate(user)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(user.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" component="div">
              אין משתמשים להצגה
            </Typography>
          )}
        </Grid>

        <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
          <DialogTitle>{editUser ? 'עדכן משתמש' : 'הוסף משתמש חדש'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="שם משתמש"
              type="text"
              fullWidth
              variant="standard"
              value={editUser ? editUser.name : ''}
              onChange={(e) => {
                setEditUser({ ...editUser, name: e.target.value });
              }}
            />
            <TextField
              margin="dense"
              label="דואר אלקטרוני"
              type="email"
              fullWidth
              variant="standard"
              value={editUser ? editUser.email : ''}
              onChange={(e) => {
                setEditUser({ ...editUser, email: e.target.value });
              }}
            />
            <TextField
              margin="dense"
              label="הרשאה"
              type="text"
              fullWidth
              variant="standard"
              value={editUser ? editUser.permission : ''}
              onChange={(e) => {
                setEditUser({ ...editUser, permission: e.target.value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPopup(false)}>ביטול</Button>
            <Button onClick={handleSaveUpdate}>
              {editUser ? 'שמור עדכון' : 'הוסף משתמש'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}

export default Users;