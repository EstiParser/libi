import axios from 'axios';
import { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Grid, CircularProgress, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
      </Container>
    </ThemeProvider>
  );
}

export default Products;