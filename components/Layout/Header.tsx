
import React from 'react';
import { useStore } from '../../store/useStore';
import { LogOut, Bell, User } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="bg-gol-primary p-2 rounded-lg">
          <span className="text-white font-bold text-xl tracking-tighter">GOL</span>
        </div>
        <h1 className="text-gol-gray font-semibold text-lg hidden md:block">
          ShiftFlow System
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-gol-medium hover:text-gol-primary transition-colors">
          <Bell size={20} />
        </button>
        
        <div className="flex items-center gap-3 border-l pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gol-gray leading-tight">
              {user?.displayName || 'Usuário Teste'}
            </p>
            <p className="text-xs text-gol-medium uppercase tracking-wider">
              {user?.role || 'Admin'} - {user?.base || 'POAMX'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gol-light flex items-center justify-center text-gol-primary font-bold border-2 border-gol-primary/20">
            <User size={20} />
          </div>
          <button 
            onClick={logout}
            className="text-gol-medium hover:text-red-500 transition-colors ml-2"
            title="Sair"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

// Lucid Icons mock for the prompt environment
const LucideIcons = () => null;
