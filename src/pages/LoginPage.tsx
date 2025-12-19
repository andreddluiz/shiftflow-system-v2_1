import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useStore } from '../store/useStore';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Usar email como username para Firebase
      const email = `${username}@gol.com.br`;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email || '',
        displayName: username,
        username: username,
        role: 'admin',
        base: 'GRU-SP',
        status: 'ATIVO'
      });

      navigate('/dashboard');
    } catch (err: any) {
      setError('Usuário ou senha inválidos');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FF6B35 0%, #E85A2A 100%)',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            padding: 4,
            borderRadius: 2,
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Logo GOL */}
          <Box
            sx={{
              textAlign: 'center',
              marginBottom: 3,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: '#FF6B35',
                fontWeight: 700,
                marginBottom: 1,
              }}
            >
              GOL
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#3A3A3A',
                fontWeight: 600,
              }}
            >
              ShiftFlow System
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#666666',
                marginTop: 1,
              }}
            >
              Painel Administrativo
            </Typography>
          </Box>

          {/* Mensagem de Erro */}
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          {/* Formulário de Login */}
          <form onSubmit={handleLogin}>
            {/* Campo Usuário */}
            <TextField
              fullWidth
              label="Usuário / RE"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              variant="outlined"
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#FF6B35',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6B35',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#999999',
                  opacity: 1,
                },
              }}
              placeholder="Insira seu usuário"
            />

            {/* Campo Senha */}
            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              variant="outlined"
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#FF6B35',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF6B35',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#999999',
                  opacity: 1,
                },
              }}
              placeholder="Insira sua senha"
            />

            {/* Botão Entrar */}
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                marginTop: 3,
                marginBottom: 2,
                padding: '12px 24px',
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: '#FF6B35',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#E85A2A',
                },
                '&:disabled': {
                  backgroundColor: '#CCCCCC',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'ENTRAR NO SISTEMA'}
            </Button>
          </form>

          {/* Rodapé */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              color: '#999999',
              marginTop: 2,
            }}
          >
            © 2025 GOL Linhas Aéreas - Todos os direitos reservados.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;