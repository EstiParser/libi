import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Button, CssBaseline, TextField, Link, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#555' },
        secondary: { main: '#333' },
    },
});

function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/auth/login', {
                password,
                email
            });
            console.log(response);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.permission);
            console.log(response.data.permission);
            
            if (response.data.permission == 'user') {
                navigate('/userHome');
                window.location.reload();
            } else {
                navigate('/allProducts');
                window.location.reload();
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('שגיאה בכניסה למערכת');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            InputLabelProps={{ shrink: true }}
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Link href="http://localhost:5173/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Login;