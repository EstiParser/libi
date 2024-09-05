import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Grid, CircularProgress, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

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

function Products() {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editProduct, setEditProduct] = useState(null);

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
        const result = await axios.get('http://127.0.0.1:5000/products/get', {
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
          console.error('No products array found in the response', result.data);
        }
      } catch (error) {
        console.error('Error fetching product details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/delete/${id}`, {
        headers: { authorization: token },
      });
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const handleUpdate = (product) => {
    setEditProduct({ ...product });
    setOpenPopup(true);
  };

  const handleSaveUpdate = async () => {
    if (!editProduct) return;

    try {
      await axios.put(`http://127.0.0.1:5000/products/update/${editProduct.id}`, {
        name: editProduct.name,
        price: editProduct.price,
      }, {
        headers: { authorization: token },
      });
      await fetchProducts();
      setOpenPopup(false);
      setEditProduct(null);
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/products/add', newProduct, {
        headers: { authorization: token },
      });
      await fetchProducts();
      setOpenPopup(false);
      setNewProduct({ name: '', price: '' });
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  const fetchProducts = async () => {
    if (!token) return;

    try {
      const result = await axios.get('http://127.0.0.1:5000/products/get', {
        headers: {
          authorization: token,
        },
      });

      console.log('Fetch products response:', result.data);

      if (Array.isArray(result.data)) {
        setResponse(result.data);
      } else if (Array.isArray(result.data.data)) {
        setResponse(result.data.data);
      } else {
        console.error('No products array found in the response', result.data);
      }
    } catch (error) {
      console.error('Error fetching product details', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginLeft: '10%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setNewProduct({ name: '', price: '' });
            setEditProduct(null);
            setOpenPopup(true);
          }}
          sx={{ marginBottom: '20px' }}
        >
          {editProduct ? 'שמור עדכון' : 'הוסף מוצר'}
        </Button>
        <Grid container spacing={2}>
          {response.length > 0 ? (
            response.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      מחיר: {product.price}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                      <IconButton onClick={() => handleUpdate(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" component="div">
              אין מוצרים להצגה
            </Typography>
          )}
        </Grid>

        <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
          <DialogTitle>{editProduct ? 'עדכן מוצר' : 'הוסף מוצר חדש'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="שם מוצר"
              type="text"
              fullWidth
              variant="standard"
              value={editProduct ? editProduct.name : newProduct.name}
              onChange={(e) => {
                if (editProduct) {
                  setEditProduct({ ...editProduct, name: e.target.value });
                } else {
                  setNewProduct({ ...newProduct, name: e.target.value });
                }
              }}
            />
            <TextField
              margin="dense"
              label="מחיר"
              type="text"
              fullWidth
              variant="standard"
              value={editProduct ? editProduct.price : newProduct.price}
              onChange={(e) => {
                if (editProduct) {
                  setEditProduct({ ...editProduct, price: e.target.value });
                } else {
                  setNewProduct({ ...newProduct, price: e.target.value });
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPopup(false)}>ביטול</Button>
            <Button onClick={editProduct ? handleSaveUpdate : handleAddProduct}>
              {editProduct ? 'שמור עדכון' : 'הוסף מוצר'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}

export default Products;
