
import React, { useState } from 'react';
import Snowfall from './components/Snowfall';
import CountdownTimer from './components/CountdownTimer';
import NewYearAI from './components/NewYearAI';
import ProjectCard from './components/ProjectCard';
import { FeedbackForm, CommentsSection } from './components/InteractiveElements';
import { GiftCatcher, VirusHunter, CodeBreaker, FirewallDefense } from './components/MiniGames';
import Settings from './components/Settings';
import { Project, AppSettings, Language } from './types';

const translations = {
  uk: {
    title: 'Аріна: Шиття & Код',
    nav: { projects: 'Проєкти', games: 'Ігри', about: 'Про мене', contact: 'Зв\'язок' },
    hero: 'Роблю круті речі для себе та готуюся стати програмістом! (ᵔ◡ᵔ) ✨',
    countdown: 'До Нового Року залишилось:',
    story_title: 'Мій шлях 👩‍💻',
    story_p1: 'Я не хочу просто шити на замовлення, я хочу створювати красу для себе! Шиття швеєю — це мій спосіб відпочити. 🧵',
    story_p2: 'Але моя велика мрія — Програмування. Мама розповідала про додатки-злодії, і я вирішила: я створюватиму антивіруси та ігри, щоб захистити користувачів! 🛡️🎮 ʕ•ᴥ•ʔ',
    plans: 'Мої Плани 🚀',
    gamery: 'Ігротека Аріни 🎮',
    about_title: 'Про Аріну OwO',
    about_p1: 'Мені подобається створювати щось нове, чи то гарна сукня, чи то код для гри. (ᵔ◡ᵔ)',
    about_p2: 'Хоча ноутбук завтра заберуть, я повернуся з новими силами! ʕ•ᴥ•ʔ',
    contact_me: 'Зв\'язок зі мною 📱',
    viber: 'Вайбер / Дзвінки',
    telegram: 'Телеграм',
    email: 'Ел. пошта (відгуки тощо)',
    tiktok_main: 'TikTok (Основний)',
    tiktok_cringe: 'TikTok (Arina2013 - "крінж" :з)',
    tiktok_soon: 'Тік Ток скоро буде...',
    footer: 'Аріна-Розробник ✨ (づ｡◕‿‿◕｡)づ',
  },
  ru: {
    title: 'Арина: Шитье & Код',
    nav: { projects: 'Проекты', games: 'Игры', about: 'Обо мне', contact: 'Связь' },
    hero: 'Делаю крутые вещи для себя и готовлюсь стать программистом! (ᵔ◡ᵔ) ✨',
    countdown: 'До Нового Года осталось:',
    story_title: 'Мой путь 👩‍💻',
    story_p1: 'Я не хочу просто шить на заказ, я хочу создавать красоту для себя! Шитье швеей — это мой способ отдохнуть. 🧵',
    story_p2: 'Но моя большая мечта — Программирование. Мама рассказывала про приложения-воры, и я решила: я буду создавать антивирусы и игры, чтобы защитить пользователей! 🛡️🎮 ʕ•ᴥ•ʔ',
    plans: 'Мои Планы 🚀',
    gamery: 'Игротека Арины 🎮',
    about_title: 'Об Арине OwO',
    about_p1: 'Мне нравится создавать что-то новое, будь то красивое платье или код для игры. (ᵔ◡ᵔ)',
    about_p2: 'Хотя ноутбук завтра заберут, я вернусь с новыми силами! ʕ•ᴥ•ʔ',
    contact_me: 'Связь со мной 📱',
    viber: 'Вайбер / Звонки',
    telegram: 'Телеграм',
    email: 'Эл. почта (отзывы и т.д.)',
    tiktok_main: 'TikTok (Основной)',
    tiktok_cringe: 'TikTok (Arina2013 - "кринж" :з)',
    tiktok_soon: 'Тик Ток скоро будет...',
    footer: 'Арина-Разработчик ✨ (づ｡◕‿‿◕｡)づ',
  },
  en: {
    title: 'Arina: Sewing & Code',
    nav: { projects: 'Projects', games: 'Games', about: 'About', contact: 'Contact' },
    hero: 'Creating cool things for myself and preparing to be a programmer! (ᵔ◡ᵔ) ✨',
    countdown: 'Time left until New Year:',
    story_title: 'My Journey 👩‍💻',
    story_p1: 'I don\'t want to just sew for orders, I want to create beauty for myself! Sewing is my way to relax. 🧵',
    story_p2: 'But my big dream is Programming. My mom told me about thief apps, and I decided: I will create antiviruses and games to protect users! 🛡️🎮 ʕ•ᴥ•ʔ',
    plans: 'My Plans 🚀',
    gamery: 'Arina\'s Games 🎮',
    about_title: 'About Arina OwO',
    about_p1: 'I love creating new things, whether it\'s a beautiful dress or code for a game. (ᵔ◡ᵔ)',
    about_p2: 'Even though my laptop will be taken away tomorrow, I\'ll be back stronger! ʕ•ᴥ•ʔ',
    contact_me: 'Contact Me 📱',
    viber: 'Viber / Calls',
    telegram: 'Telegram',
    email: 'Email (feedback etc.)',
    tiktok_main: 'TikTok (Main)',
    tiktok_cringe: 'TikTok (Arina2013 - "cringe" :з)',
    tiktok_soon: 'TikTok coming soon...',
    footer: 'Arina-Developer ✨ (づ｡◕‿‿◕｡)づ',
  }
};

const App: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>({
    fontSize: 'medium',
    fontWeight: 'normal',
    accentColor: '#facc15',
    language: 'uk'
  });

  const t = translations[settings.language];

  const fontSizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }[settings.fontSize];

  const fontWeightClass = settings.fontWeight === 'bold' ? 'font-bold' : 'font-normal';

  const projects: Project[] = [
    {
      id: 'sewing',
      title: settings.language === 'en' ? 'Sewing (for myself) 🧵' : settings.language === 'ru' ? 'Шитье швеей (для себя) 🧵' : 'Шиття швеєю (для себе) 🧵',
      icon: '👗',
      goal: settings.language === 'en' ? 'Create professional clothes for myself!' : settings.language === 'ru' ? 'Создавать профессиональные вещи для себя!' : 'Створювати професійні та красиві речі для себе!',
      stages: settings.language === 'en' ? ['Master new machine', 'Design "For Arina" collection'] : ['Опанувати машинку ✨', 'Колекція "Для Аріни" 👗'],
      results: settings.language === 'en' ? 'Wardrobe of dreams!' : 'Власний гардероб мрії!',
      progress: 40
    },
    {
      id: 'programming',
      title: settings.language === 'en' ? 'Future Programmer 💻' : settings.language === 'ru' ? 'Будущий Программист 💻' : 'Майбутній Програміст 💻',
      icon: '🚀',
      goal: settings.language === 'en' ? 'Become a safe app developer!' : 'Стати розробником безпечних додатків!',
      stages: settings.language === 'en' ? ['Build mini-games', 'Learn security'] : ['Розробка міні-ігор 🎮', 'Вивчення захисту 🛡️'],
      results: settings.language === 'en' ? 'Cool apps for everyone!' : 'Круті додатки для всіх!',
      progress: 45
    }
  ];

  return (
    <div className={`relative min-h-screen text-white overflow-x-hidden pb-20 selection:bg-yellow-400 selection:text-blue-900 ${fontSizeClass} ${fontWeightClass}`}>
      <Snowfall />
      <Settings settings={settings} setSettings={setSettings} />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10 py-4 px-6 flex justify-between items-center">
        <span className="font-pacifico text-2xl tracking-wider" style={{ color: settings.accentColor }}>Arina OwO 2026 :з</span>
        <div className="flex gap-6 text-sm font-bold">
          <a href="#projects" className="hover:opacity-70 transition-colors">{t.nav.projects}</a>
          <a href="#games" className="hover:opacity-70 transition-colors">{t.nav.games}</a>
          <a href="#about" className="hover:opacity-70 transition-colors">{t.nav.about}</a>
          <a href="#contact" className="hover:opacity-70 transition-colors underline">{t.nav.contact}</a>
        </div>
      </nav>

      <header className="pt-32 px-4 text-center z-10 relative">
        <div className="animate-bounce mb-6 inline-block bg-white/10 p-4 rounded-full">🧵💻</div>
        <h1 className="text-5xl md:text-7xl font-pacifico drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] mb-6" style={{ color: settings.accentColor }}>
          {t.title}
        </h1>
        <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto opacity-90 leading-relaxed italic">
          "{t.hero}"
        </p>
        
        <div className="mt-12">
          <p className="text-sm uppercase tracking-widest opacity-60 mb-4">{t.countdown} (✿◠‿◠)</p>
          <CountdownTimer language={settings.language} />
        </div>
      </header>

      <main className="container mx-auto px-4 z-10 relative max-w-5xl">
        
        <section className="my-24 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 p-10 rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden">
          <h2 className="text-4xl font-pacifico text-white mb-6">{t.story_title}</h2>
          <div className="text-lg space-y-4 leading-relaxed">
            <p>{t.story_p1}</p>
            <p>{t.story_p2}</p>
          </div>
        </section>

        <section id="projects" className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.plans}</h2>
            <div className="h-1 w-24 mx-auto rounded-full" style={{ backgroundColor: settings.accentColor }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map(p => <ProjectCard key={p.id} project={p} language={settings.language} />)}
          </div>
        </section>

        <section id="games" className="py-12">
          <h2 className="text-3xl font-bold text-center mb-10">{t.gamery}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GiftCatcher language={settings.language} />
            <VirusHunter language={settings.language} />
            <CodeBreaker language={settings.language} />
            <FirewallDefense language={settings.language} />
          </div>
        </section>

        <section id="about" className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-black/30 p-8 rounded-3xl border border-white/10 relative">
            <h2 className="text-3xl font-bold mb-6">{t.about_title}</h2>
            <p className="mb-4">{t.about_p1}</p>
            <p className="opacity-70 text-sm mb-8">{t.about_p2}</p>
            
            <div id="contact" className="mt-8 pt-8 border-t border-white/20">
              <h3 className="text-2xl font-bold mb-6 italic text-yellow-300">{t.contact_me}</h3>
              <div className="space-y-4 font-mono">
                <div className="flex items-center gap-3 group bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-xs opacity-50 uppercase">{t.viber}</p>
                    <p className="text-lg font-bold">380 99 43 192 11</p>
                  </div>
                </div>
                
                <a href="https://t.me/Arina2013OwO" target="_blank" rel="noreferrer" className="flex items-center gap-3 group bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-blue-500/20 transition-all">
                  <span className="text-2xl">✈️</span>
                  <div>
                    <p className="text-xs opacity-50 uppercase">{t.telegram}</p>
                    <p className="text-lg font-bold">@Arina2013OwO</p>
                  </div>
                </a>

                <a href="mailto:neariarina@gmail.com" className="flex items-center gap-3 group bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-yellow-500/20 transition-all">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="text-xs opacity-50 uppercase">{t.email}</p>
                    <p className="text-lg font-bold underline">neariarina@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 group bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-pink-500/20 transition-all">
                  <span className="text-2xl">🎵</span>
                  <div>
                    <p className="text-xs opacity-50 uppercase">{t.tiktok_main}</p>
                    <p className="text-sm font-bold">arina_mama_vasha.forsari</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-pink-500/20 transition-all">
                  <span className="text-2xl">💃</span>
                  <div>
                    <p className="text-xs opacity-50 uppercase">{t.tiktok_cringe}</p>
                    <p className="text-sm font-bold opacity-80">Arina2013</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <FeedbackForm language={settings.language} />
            <CommentsSection language={settings.language} />
          </div>
        </section>

        <section className="pb-20">
          <NewYearAI language={settings.language} />
        </section>

      </main>

      <footer className="fixed bottom-0 left-0 w-full py-6 text-center bg-black/80 backdrop-blur-md z-20 border-t border-white/10">
        <p className="text-sm">
          &copy; 2026 {t.footer}
        </p>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${settings.accentColor}44; border-radius: 10px; }
        html { scroll-behavior: smooth; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default App;
