import { Link, Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#333',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: theme.zIndex.drawer + 1,
}));

const StyledToolbar = styled(Toolbar)(() => ({
    justifyContent: 'space-between',
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
}));

const LogoTypography = styled(Typography)(() => ({
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1.5rem',
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
    '&:hover': {
        backgroundColor: '#555',
    },
}));

function Header() {
    const [role, setRole] = useState<string | null>(localStorage.getItem('role'));
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        const handleStorageChange = () => {
            setRole(localStorage.getItem('role'));
            setToken(localStorage.getItem('token'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <>
            <StyledAppBar position="fixed">
                <StyledToolbar>
                    <LogoTypography variant="h6" component="div">
                        פאנות
                    </LogoTypography>
                    <Box>
                        {role === 'user' && token && (
                            <>
                                <NavButton component={Link} to="/login">מנהל מערכת👈🏼</NavButton>
                                <NavButton component={Link} to="/products">גלריה</NavButton>
                                <NavButton component={Link} to="/userHome">דף הבית</NavButton>
                            </>
                        )}
                        {role === 'admin' && token && (
                            <>
                                <NavButton component={Link} to="/allProducts">כל המוצרים</NavButton>
                                <NavButton component={Link} to="/allUsers">משתמשים</NavButton>
                            </>
                        )}
                    </Box>
                </StyledToolbar>
            </StyledAppBar>
            <Box sx={{ p: 2, pt: 10 }}>
                <Outlet />
            </Box>
        </>
    );
}

export default Header;