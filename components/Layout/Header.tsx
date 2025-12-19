
import React from 'react';
import { useStore } from '../../store/useStore';
import { LogOut, Bell, User, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="bg-gol-primary p-2 rounded-lg shadow-sm">
          <span className="text-white font-bold text-xl tracking-tighter">GOL</span>
        </div>
        <h1 className="text-gol-gray font-bold text-lg hidden md:block tracking-tight">
          ShiftFlow <span className="text-gol-primary font-light">System</span>
        </h1>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <button className="text-gol-medium hover:text-gol-primary transition-colors relative p-2 rounded-full hover:bg-gol-light">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gol-primary rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 border-l pl-4 md:pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gol-gray leading-tight">
              {user?.displayName || 'Usuário Teste'}
            </p>
            <p className="text-[10px] text-gol-medium uppercase font-bold tracking-widest">
              {user?.role || 'Admin'} • {user?.base || 'POAMX'}
            </p>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gol-light flex items-center justify-center text-gol-primary font-bold border-2 border-gol-primary/20 group-hover:border-gol-primary transition-all overflow-hidden shadow-inner">
              {user?.displayName?.charAt(0) || <User size={20} />}
            </div>
            <ChevronDown size={14} className="text-gol-medium group-hover:text-gol-primary transition-colors" />
          </div>
          <button 
            onClick={logout}
            className="text-gol-medium hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 ml-1"
            title="Sair do Sistema"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
