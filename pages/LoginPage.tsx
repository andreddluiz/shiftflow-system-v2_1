
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { UserRole, UserStatus } from '../types';
import { AlertCircle, Lock, User, Plane } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (formData.username.length < 5) return "Username deve ter no mínimo 5 caracteres.";
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      return "Senha deve ter 8+ caracteres, com maiúscula, minúscula e número.";
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
    
    // Simulate login logic
    setTimeout(() => {
      if (formData.username === 'teste' && formData.password === 'Teste@123') {
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
        setError("Credenciais inválidas. Use teste / Teste@123");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gol-gray relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 p-12 opacity-10">
        <Plane size={400} className="text-white transform rotate-45" />
      </div>

      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl relative z-10 mx-4">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gol-primary p-4 rounded-2xl shadow-lg mb-4">
            <span className="text-white font-black text-4xl tracking-tighter">GOL</span>
          </div>
          <h2 className="text-2xl font-bold text-gol-gray">ShiftFlow System</h2>
          <p className="text-gol-medium text-sm mt-1 uppercase tracking-widest">Painel Administrativo</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-sm animate-pulse">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gol-gray mb-1 ml-1">Usuário</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gol-medium" size={18} />
              <input
                type="text"
                placeholder="Insira seu usuário"
                className="w-full pl-12 pr-4 py-3 bg-gol-light border-2 border-transparent focus:border-gol-primary rounded-xl outline-none transition-all"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gol-gray mb-1 ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gol-medium" size={18} />
              <input
                type="password"
                placeholder="Insira sua senha"
                className="w-full pl-12 pr-4 py-3 bg-gol-light border-2 border-transparent focus:border-gol-primary rounded-xl outline-none transition-all"
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
              flex items-center justify-center gap-2 mt-4
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

        <p className="mt-8 text-center text-xs text-gol-medium">
          © {new Date().getFullYear()} GOL Linhas Aéreas - Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
