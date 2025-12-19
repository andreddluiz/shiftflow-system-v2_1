
import React from 'react';
import { useStore } from '../store/useStore';
import { Plane, Users, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useStore();

  const stats = [
    { label: 'Voos do Dia', value: '142', icon: Plane, color: 'bg-blue-500', trend: '+12%' },
    { label: 'Tripulantes Ativos', value: '3,284', icon: Users, color: 'bg-gol-primary', trend: '+3%' },
    { label: 'Trocas Pendentes', value: '28', icon: Calendar, color: 'bg-purple-500', trend: '-2' },
    { label: 'Eficiência Operacional', value: '98.2%', icon: TrendingUp, color: 'bg-green-500', trend: '+0.5%' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-gol-gray">Dashboard</h2>
        <p className="text-gol-medium">Bem-vindo de volta, <span className="text-gol-primary font-semibold">{user?.displayName}</span>. Veja o que está acontecendo hoje.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-2xl text-white shadow-lg`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gol-medium text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-3xl font-black text-gol-gray tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Alerts */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-lg">Alertas de Operação</h3>
            <button className="text-gol-primary text-sm font-bold hover:underline">Ver todos</button>
          </div>
          <div className="divide-y divide-gray-100">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex-shrink-0 flex items-center justify-center text-yellow-600">
                  <AlertTriangle size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gol-gray">Escala não preenchida: Voo G3 1240</h4>
                    <span className="text-xs text-gol-medium">15 min atrás</span>
                  </div>
                  <p className="text-sm text-gol-medium">Falta tripulação técnica para o trecho GRU - POA previsto para as 14:30.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h3 className="font-bold text-lg mb-6">Ações Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full py-4 px-6 bg-gol-light hover:bg-gol-primary hover:text-white rounded-2xl text-left font-semibold transition-all flex items-center justify-between group">
              Nova Escala
              <Calendar className="text-gol-primary group-hover:text-white transition-colors" size={20} />
            </button>
            <button className="w-full py-4 px-6 bg-gol-light hover:bg-gol-primary hover:text-white rounded-2xl text-left font-semibold transition-all flex items-center justify-between group">
              Cadastrar Tripulante
              <Users className="text-gol-primary group-hover:text-white transition-colors" size={20} />
            </button>
            <button className="w-full py-4 px-6 bg-gol-light hover:bg-gol-primary hover:text-white rounded-2xl text-left font-semibold transition-all flex items-center justify-between group">
              Emitir Relatório
              <FileText className="text-gol-primary group-hover:text-white transition-colors" size={20} />
            </button>
          </div>
          
          <div className="mt-auto pt-8">
            <div className="bg-gol-primary/5 rounded-2xl p-6 border border-gol-primary/10">
              <p className="text-sm font-bold text-gol-primary mb-2">Suporte ShiftFlow</p>
              <p className="text-xs text-gol-medium leading-relaxed mb-4">Problemas com o sistema? Entre em contato com o TI GOL ramal 4455.</p>
              <button className="text-xs font-black text-gol-primary hover:underline">ABRIR CHAMADO</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

// Mock icons for prompt
const FileText = ({ className, size }: { className?: string, size?: number }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;
