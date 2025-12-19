
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { UserRole, UserStatus } from '../types';
import { AlertCircle, Lock, User, Plane, CheckCircle2 } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fillTestData = () => {
    setFormData({
      username: 'teste',
      password: 'Teste@123'
    });
    setError(null);
  };

  const validate = () => {
    if (formData.username.length < 5) {
      return "O usuário deve ter pelo menos 5 caracteres.";
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      return "A senha deve ter 8+ caracteres, incluindo maiúscula, minúscula e número.";
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    
    // Simulação de login
    setTimeout(() => {
      const isValidUser = formData.username.toLowerCase() === 'teste' || formData.username.toLowerCase() === 'teste@gol.com';
      const isValidPassword = formData.password === 'Teste@123';

      if (isValidUser && isValidPassword) {
        setUser({
          uid: '1',
          username: 'teste',
          email: 'teste@gol.com',
          displayName: 'Usuário Teste GOL',
          role: UserRole.ADMIN,
          base: 'POAMX',
          status: UserStatus.ACTIVE,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        navigate('/');
      } else {
        setError("Credenciais inválidas. Verifique os dados ou use o botão de acesso rápido.");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gol-gray relative overflow-hidden p-4">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <Plane size={400} className="text-white transform rotate-45" />
      </div>

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl relative z-10 overflow-hidden">
        <div className="p-8 pb-4">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gol-primary p-4 rounded-2xl shadow-lg mb-4">
              <span className="text-white font-black text-4xl tracking-tighter">GOL</span>
            </div>
            <h2 className="text-2xl font-bold text-gol-gray">ShiftFlow System</h2>
            <p className="text-gol-medium text-sm mt-1 uppercase tracking-widest font-semibold">Operações de Escala</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-4 duration-300">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gol-gray mb-1.5 ml-1">Usuário ou E-mail</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gol-medium" size={18} />
                <input
                  type="text"
                  placeholder="teste ou teste@gol.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-gol-light border-2 border-transparent focus:border-gol-primary rounded-xl outline-none transition-all font-medium"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gol-gray mb-1.5 ml-1">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gol-medium" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-gol-light border-2 border-transparent focus:border-gol-primary rounded-xl outline-none transition-all font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-4 bg-gol-primary text-white font-bold rounded-xl shadow-lg shadow-gol-primary/30
                hover:bg-gol-dark transition-all transform hover:-translate-y-1 active:scale-95
                flex items-center justify-center gap-2 mt-6
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}
              `}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'ENTRAR NO SISTEMA'
              )}
            </button>
          </form>
        </div>

        {/* Test Access Helper */}
        <div className="bg-gol-light/50 p-6 border-t border-gray-100 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gol-gray uppercase tracking-wider mb-1">Acesso para Testes</p>
              <p className="text-xs text-gol-medium">Clique para preencher os dados de homologação.</p>
            </div>
            <button 
              type="button"
              onClick={fillTestData}
              className="px-4 py-2 bg-white border border-gol-primary/20 text-gol-primary text-xs font-bold rounded-lg hover:bg-gol-primary hover:text-white transition-all shadow-sm flex items-center gap-2 group"
            >
              <CheckCircle2 size={14} className="group-hover:scale-110 transition-transform" />
              USAR TESTE
            </button>
          </div>
        </div>

        <p className="pb-8 pt-4 text-center text-[10px] text-gol-medium uppercase tracking-widest font-bold opacity-50">
          © {new Date().getFullYear()} GOL Linhas Aéreas
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
