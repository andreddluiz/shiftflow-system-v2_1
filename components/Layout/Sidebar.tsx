
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, Calendar, Users, FileText, ChevronRight } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/calendar', label: 'Escalas', icon: Calendar },
  { path: '/users', label: 'Equipe', icon: Users },
  { path: '/reports', label: 'Relatórios', icon: FileText },
  { path: '/settings', label: 'Configurações', icon: Settings },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gol-gray h-screen flex flex-col fixed left-0 top-0 pt-16 z-40 overflow-y-auto">
      <nav className="mt-8 flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? 'bg-gol-primary text-white shadow-lg' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={isActive ? 'text-white' : 'group-hover:text-gol-primary'} />
                <span className="font-medium">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <p className="text-xs text-gol-medium mb-1">Status do Sistema</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-white font-medium">Operacional</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
