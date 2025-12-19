import { create } from 'zustand';

// Enums para tipos de usuário
export enum UserRole {
  ADMIN = 'admin',
  TRIPULANTE = 'tripulante',
  SUPERVISOR = 'supervisor',
}

export enum UserStatus {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
}

// Interface para o perfil do usuário
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  username: string;
  role: UserRole;
  base: string;
  status: UserStatus;
}

// Interface para o estado da store
interface AuthStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile) => void;
  clearUser: () => void;
  logout: () => void;
}

// Criar a store com Zustand
export const useStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user: UserProfile) => {
    set({
      user,
      isAuthenticated: true,
    });
    // Salvar no localStorage para persistência
    localStorage.setItem('user', JSON.stringify(user));
  },

  clearUser: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('user');
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('user');
  },
}));

// Hook para recuperar usuário do localStorage ao iniciar
export const initializeUser = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser) as UserProfile;
      useStore.setState({
        user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Erro ao recuperar usuário do localStorage:', error);
      localStorage.removeItem('user');
    }
  }
};