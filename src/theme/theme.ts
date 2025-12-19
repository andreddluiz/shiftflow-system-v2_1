import { createTheme } from '@mui/material/styles';

export const golTheme = createTheme({
  palette: {
    primary: {
      main: '#FF6B35', // Laranja GOL
      light: '#FF8A5B',
      dark: '#E85A2A',
      contrastText: '#fff',
    },
    secondary: {
      main: '#3A3A3A', // Cinza escuro
      light: '#666666',
      dark: '#1A1A1A',
      contrastText: '#fff',
    },
    background: {
      default: '#F5F5F5', // Cinza claro
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3A3A3A',
      secondary: '#666666',
    },
    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#FFC107',
    },
    error: {
      main: '#F44336',
    },
    info: {
      main: '#2196F3',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#FF6B35',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#3A3A3A',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#3A3A3A',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#3A3A3A',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#3A3A3A',
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: '#3A3A3A',
    },
    body1: {
      fontSize: '1rem',
      color: '#3A3A3A',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#666666',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 600,
        },
        contained: {
          backgroundColor: '#FF6B35',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#E85A2A',
          },
        },
        outlined: {
          borderColor: '#FF6B35',
          color: '#FF6B35',
          '&:hover': {
            backgroundColor: '#FFF5F0',
            borderColor: '#E85A2A',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '&:hover fieldset': {
              borderColor: '#FF6B35',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF6B35',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FF6B35',
          boxShadow: '0 2px 8px rgba(255, 107, 53, 0.15)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#3A3A3A',
          color: '#fff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          '& .MuiTableHead-root': {
            backgroundColor: '#FF6B35',
            '& .MuiTableCell-head': {
              color: '#fff',
              fontWeight: 600,
            },
          },
          '& .MuiTableBody-root': {
            '& .MuiTableRow-root:hover': {
              backgroundColor: '#F5F5F5',
            },
          },
        },
      },
    },
  },
});