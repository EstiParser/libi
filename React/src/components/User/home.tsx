import { Container, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Arial',
  },
});

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ marginTop: '5%', textAlign: 'center' }}>
        <Box sx={{ backgroundColor: 'primary.main', padding: 4, borderRadius: 2 }}>
          <Typography variant="h3" color="secondary.main">
            חבר מביא חבר!
          </Typography>
          <Typography variant="h6" color="secondary.main" sx={{ marginTop: 2 }}>
            פרסומת על מבצע מטורף - כנסו לראות!
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Home;