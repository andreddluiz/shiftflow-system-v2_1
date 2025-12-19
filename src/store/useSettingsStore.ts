
import { create } from 'zustand';
import { SystemSettings } from '../types';

interface SettingsState {
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: {
    name: "ShiftFlow System",
    logoUrl: "",
    palette: "gol",
    primaryColor: "#FF6B35",
    secondaryColor: "#3A3A3A",
    updatedAt: new Date().toISOString(),
  },
  updateSettings: (newSettings) => set((state) => ({
    settings: { ...state.settings, ...newSettings, updatedAt: new Date().toISOString() }
  })),
}));
