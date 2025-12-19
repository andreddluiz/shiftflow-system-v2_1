import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Toolbar, CircularProgress } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { useStore, UserRole, UserStatus } from './store/useStore';
import { golTheme } from './theme/theme';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <Header onMenuClick={handleDrawerToggle} />
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 4, width: { sm: `calc(100% - 240px)` } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

interface PrivateRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  loading: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuthenticated, loading }) => {
  if (loading) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const { user, setUser, clearUser, isAuthenticated } = useStore();
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuário GOL',
          username: firebaseUser.email?.split('@')[0] || 'usuario',
          role: UserRole.ADMIN,
          base: 'GRU-SP',
          status: UserStatus.ATIVO
        });
      } else {
        clearUser();
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, clearUser]);

  useEffect(() => {
    if (!authLoading) {
      setLoading(false);
    }
  }, [authLoading]);

  if (loading) {
    return (
      <ThemeProvider theme={golTheme}>
        <CssBaseline />
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={golTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute 
                isAuthenticated={isAuthenticated} 
                loading={authLoading}
              >
                <DashboardPage />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;