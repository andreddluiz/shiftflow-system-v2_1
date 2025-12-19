
import React, { useState } from 'react';
import { Search, UserPlus, Filter, MoreVertical, Mail, MapPin, Briefcase } from 'lucide-react';
import { UserRole, UserStatus } from '../types';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  base: string;
  status: UserStatus;
  lastActive: string;
}

const MOCK_USERS: UserData[] = [
  { id: '1', name: 'Ricardo Santos', email: 'ricardo.santos@gol.com', role: UserRole.MANAGER, base: 'GRU', status: UserStatus.ACTIVE, lastActive: 'Hoje, 08:45' },
  { id: '2', name: 'Ana Oliveira', email: 'ana.oliveira@gol.com', role: UserRole.USER, base: 'CGH', status: UserStatus.ACTIVE, lastActive: 'Hoje, 09:12' },
  { id: '3', name: 'Marcos Viana', email: 'marcos.viana@gol.com', role: UserRole.USER, base: 'BSB', status: UserStatus.INACTIVE, lastActive: 'Há 2 dias' },
  { id: '4', name: 'Juliana Costa', email: 'juliana.costa@gol.com', role: UserRole.ADMIN, base: 'POA', status: UserStatus.ACTIVE, lastActive: 'Hoje, 10:00' },
  { id: '5', name: 'Felipe Melo', email: 'felipe.melo@gol.com', role: UserRole.USER, base: 'GRU', status: UserStatus.ACTIVE, lastActive: 'Ontem, 18:30' },
];

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [baseFilter, setBaseFilter] = useState('Todas');

  const filteredUsers = MOCK_USERS.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBase = baseFilter === 'Todas' || user.base === baseFilter;
    return matchesSearch && matchesBase;
  });

  const bases = ['Todas', 'GRU', 'CGH', 'BSB', 'POA', 'SDU', 'VCP'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gol-gray">Equipe</h2>
          <p className="text-gol-medium">Gerencie os tripulantes e permissões de acesso da malha.</p>
        </div>
        <button className="bg-gol-primary text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gol-dark transition-all shadow-lg shadow-gol-primary/20 transform hover:-translate-y-0.5">
          <UserPlus size={20} />
          NOVO INTEGRANTE
        </button>
      </header>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gol-medium" size={18} />
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            className="w-full pl-12 pr-4 py-2 bg-gol-light border border-transparent focus:border-gol-primary rounded-xl outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gol-medium" size={18} />
          <select 
            className="bg-gol-light border-none rounded-xl px-4 py-2 outline-none font-medium text-gol-gray focus:ring-2 ring-gol-primary/20"
            value={baseFilter}
            onChange={(e) => setBaseFilter(e.target.value)}
          >
            {bases.map(base => (
              <option key={base} value={base}>{base === 'Todas' ? 'Todas as Bases' : `Base ${base}`}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gol-light/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gol-medium uppercase tracking-wider">Tripulante</th>
                <th className="px-6 py-4 text-xs font-bold text-gol-medium uppercase tracking-wider">Base / Função</th>
                <th className="px-6 py-4 text-xs font-bold text-gol-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gol-medium uppercase tracking-wider">Último Acesso</th>
                <th className="px-6 py-4 text-xs font-bold text-gol-medium uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gol-light/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gol-primary/10 flex items-center justify-center text-gol-primary font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gol-gray leading-tight group-hover:text-gol-primary transition-colors">{user.name}</p>
                        <div className="flex items-center gap-1 text-xs text-gol-medium">
                          <Mail size={12} />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm font-medium text-gol-gray">
                        <MapPin size={14} className="text-gol-primary" />
                        {user.base}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gol-medium">
                        <Briefcase size={12} />
                        {user.role.toUpperCase()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.status === UserStatus.ACTIVE 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gol-medium">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gol-medium hover:text-gol-primary transition-colors p-2 rounded-lg hover:bg-white shadow-sm border border-transparent hover:border-gray-100">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="p-16 text-center">
            <div className="bg-gol-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gol-medium" size={32} />
            </div>
            <p className="text-gol-gray font-bold">Nenhum resultado encontrado</p>
            <p className="text-gol-medium text-sm">Tente ajustar seus termos de busca ou filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
