
import React from 'react';
import { AppSettings, Language } from '../types';

interface SettingsProps {
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const languages: { code: Language; label: string }[] = [
    { code: 'uk', label: 'UA' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' }
  ];

  return (
    <div className="fixed bottom-24 left-6 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 hover:bg-white/40 transition-all shadow-xl"
        title="Налаштування / Settings :з"
      >
        ⚙️
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-slate-900/95 border border-white/20 p-6 rounded-2xl w-64 shadow-2xl backdrop-blur-xl animate-fade-in">
          <h4 className="text-yellow-300 font-bold mb-4 flex justify-between">
            {settings.language === 'en' ? 'Settings' : settings.language === 'ru' ? 'Настройки' : 'Налаштування'} ʕ•ᴥ•ʔ
            <button onClick={() => setIsOpen(false)}>×</button>
          </h4>
          
          <div className="space-y-4 text-sm">
            <div>
              <p className="mb-2 opacity-70">{settings.language === 'en' ? 'Language:' : settings.language === 'ru' ? 'Язык:' : 'Мова:'}</p>
              <div className="flex gap-2">
                {languages.map(lang => (
                  <button 
                    key={lang.code}
                    onClick={() => setSettings({...settings, language: lang.code})}
                    className={`px-3 py-1 rounded border ${settings.language === lang.code ? 'bg-yellow-400 text-blue-900 font-bold' : 'border-white/20'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 opacity-70">{settings.language === 'en' ? 'Font Size:' : settings.language === 'ru' ? 'Размер шрифта:' : 'Розмір шрифту:'}</p>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map(size => (
                  <button 
                    key={size}
                    onClick={() => setSettings({...settings, fontSize: size})}
                    className={`px-2 py-1 rounded border ${settings.fontSize === size ? 'bg-yellow-400 text-blue-900' : 'border-white/20'}`}
                  >
                    {size === 'small' ? 'A' : size === 'medium' ? 'A+' : 'A++'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 opacity-70">{settings.language === 'en' ? 'Text Style:' : settings.language === 'ru' ? 'Стиль текста:' : 'Стиль тексту:'}</p>
              <button 
                onClick={() => setSettings({...settings, fontWeight: settings.fontWeight === 'normal' ? 'bold' : 'normal'})}
                className={`w-full py-1 rounded border ${settings.fontWeight === 'bold' ? 'bg-yellow-400 text-blue-900 font-bold' : 'border-white/20'}`}
              >
                {settings.fontWeight === 'bold' 
                  ? (settings.language === 'en' ? 'Bold' : settings.language === 'ru' ? 'Жирный' : 'Жирний') 
                  : (settings.language === 'en' ? 'Normal' : settings.language === 'ru' ? 'Обычный' : 'Звичайний')}
              </button>
            </div>

            <div>
              <p className="mb-2 opacity-70">{settings.language === 'en' ? 'Accent Color:' : settings.language === 'ru' ? 'Цвет акцента:' : 'Колір акценту:'}</p>
              <div className="flex gap-2">
                {['#facc15', '#f87171', '#60a5fa', '#4ade80'].map(color => (
                  <button 
                    key={color}
                    onClick={() => setSettings({...settings, accentColor: color})}
                    className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${settings.accentColor === color ? 'border-white' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
