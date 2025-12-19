
import React, { useState } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { Save, RefreshCcw, Palette, Layout, Globe, Shield } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useSettingsStore();
  const [localSettings, setLocalSettings] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateSettings(localSettings);
      setIsSaving(false);
      alert("Configurações salvas com sucesso!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gol-gray">Configurações</h2>
          <p className="text-gol-medium">Gerencie as preferências globais do ShiftFlow System.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gol-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gol-dark transition-all shadow-lg shadow-gol-primary/25 disabled:opacity-50"
        >
          {isSaving ? <RefreshCcw className="animate-spin" size={20} /> : <Save size={20} />}
          SALVAR ALTERAÇÕES
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white text-gol-primary font-bold rounded-xl shadow-sm border border-gray-100">
            <Layout size={18} /> Geral
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gol-medium hover:bg-white hover:text-gol-gray font-medium rounded-xl transition-all">
            <Palette size={18} /> Aparência
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gol-medium hover:bg-white hover:text-gol-gray font-medium rounded-xl transition-all">
            <Globe size={18} /> Regional
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gol-medium hover:bg-white hover:text-gol-gray font-medium rounded-xl transition-all">
            <Shield size={18} /> Segurança
          </button>
        </aside>

        <div className="md:col-span-3 space-y-6">
          {/* General Section */}
          <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gol-gray border-b pb-4">Identidade do Sistema</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-bold text-gol-gray mb-2">Nome do Sistema</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gol-light rounded-xl outline-none focus:ring-2 ring-gol-primary/20 transition-all"
                  value={localSettings.name}
                  onChange={(e) => setLocalSettings({ ...localSettings, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gol-gray mb-2">Logo URL</label>
                <input
                  type="text"
                  placeholder="https://sua-logo.com/img.png"
                  className="w-full px-4 py-3 bg-gol-light rounded-xl outline-none focus:ring-2 ring-gol-primary/20 transition-all"
                  value={localSettings.logoUrl}
                  onChange={(e) => setLocalSettings({ ...localSettings, logoUrl: e.target.value })}
                />
              </div>
            </div>
          </section>

          {/* Theme Section */}
          <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gol-gray border-b pb-4">Personalização Visual</h3>
            
            <div className="space-y-4">
              <label className="block text-sm font-bold text-gol-gray">Paleta de Cores</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { id: 'gol', label: 'GOL Padrão', primary: '#FF6B35' },
                  { id: 'dark', label: 'Modo Noturno', primary: '#1E293B' },
                  { id: 'ocean', label: 'Oceano', primary: '#0EA5E9' },
                  { id: 'emerald', label: 'Esmeralda', primary: '#10B981' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setLocalSettings({ ...localSettings, palette: p.id, primaryColor: p.primary })}
                    className={`
                      p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2
                      ${localSettings.palette === p.id ? 'border-gol-primary bg-gol-primary/5' : 'border-gray-100 hover:border-gray-300'}
                    `}
                  >
                    <div className="w-8 h-8 rounded-full" style={{ backgroundColor: p.primary }}></div>
                    <span className="text-xs font-bold text-gol-gray">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <label className="block text-sm font-bold text-gol-gray mb-2">Cor Primária</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    className="w-12 h-12 p-1 bg-gol-light rounded-lg cursor-pointer"
                    value={localSettings.primaryColor}
                    onChange={(e) => setLocalSettings({ ...localSettings, primaryColor: e.target.value })}
                  />
                  <input
                    type="text"
                    className="flex-1 px-4 py-3 bg-gol-light rounded-xl outline-none"
                    value={localSettings.primaryColor}
                    onChange={(e) => setLocalSettings({ ...localSettings, primaryColor: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gol-gray mb-2">Cor Secundária</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    className="w-12 h-12 p-1 bg-gol-light rounded-lg cursor-pointer"
                    value={localSettings.secondaryColor}
                    onChange={(e) => setLocalSettings({ ...localSettings, secondaryColor: e.target.value })}
                  />
                  <input
                    type="text"
                    className="flex-1 px-4 py-3 bg-gol-light rounded-xl outline-none"
                    value={localSettings.secondaryColor}
                    onChange={(e) => setLocalSettings({ ...localSettings, secondaryColor: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
