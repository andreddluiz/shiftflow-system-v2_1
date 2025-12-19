
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager'
}

export enum UserStatus {
  ACTIVE = 'ATIVO',
  INACTIVE = 'INATIVO'
}

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  displayName: string;
  role: UserRole;
  base: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SystemSettings {
  name: string;
  logoUrl: string;
  palette: string;
  primaryColor: string;
  secondaryColor: string;
  updatedAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}
