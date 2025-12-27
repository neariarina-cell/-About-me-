
import React, { useState, useEffect, useRef } from 'react';

const ASCII_DECOR = `
    *
   / \\
  /   \\
 /  *  \\
/_______\\
   | |
`;

export const GiftCatcher: React.FC = () => {
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [items, setItems] = useState<{ id: number; x: number; y: number; type: string }[]>([]);

  const startGame = () => {
    setScore(0);
    setItems([]);
    setGameActive(true);
  };

  useEffect(() => {
    if (!gameActive) return;
    const interval = setInterval(() => {
      const types = ['🎁', '❄️', '🍬', '⭐'];
      setItems(prev => [...prev, {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: -10,
        type: types[Math.floor(Math.random() * types.length)]
      }]);
    }, 800);
    return () => clearInterval(interval);
  }, [gameActive]);

  useEffect(() => {
    if (!gameActive) return;
    const moveInterval = setInterval(() => {
      setItems(prev => prev.map(item => ({ ...item, y: item.y + 2 })).filter(item => item.y < 100));
    }, 50);
    return () => clearInterval(moveInterval);
  }, [gameActive]);

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl overflow-hidden relative h-full">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-yellow-300">Спіймай Подарунок! 🎁</h3>
        <div className="text-2xl font-bold text-white">Очки: {score}</div>
      </div>
      {!gameActive ? (
        <div className="flex flex-col items-center justify-center h-64 bg-black/20 rounded-2xl border border-dashed border-white/30">
          <pre className="text-yellow-400 text-[10px] leading-none mb-4 font-mono">{ASCII_DECOR}</pre>
          <button onClick={startGame} className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform">Грати :з</button>
        </div>
      ) : (
        <div className="relative h-64 bg-black/30 rounded-2xl overflow-hidden cursor-crosshair">
          {items.map(item => (
            <div key={item.id} onClick={() => { setScore(s => s+1); setItems(prev => prev.filter(i => i.id !== item.id)); }}
              className="absolute text-2xl cursor-pointer select-none transition-transform hover:scale-125"
              style={{ left: `${item.x}%`, top: `${item.y}%`, transform: 'translateX(-50%)' }}>{item.type}</div>
          ))}
          <button onClick={() => setGameActive(false)} className="absolute bottom-2 right-2 text-[10px] bg-red-500/50 px-2 py-1 rounded">Стоп</button>
        </div>
      )}
    </div>
  );
};

export const VirusHunter: React.FC = () => {
  const [bugs, setBugs] = useState<{id: number; x: number; y: number}[]>([]);
  const [score, setScore] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setBugs(prev => [...prev, { id: Date.now(), x: Math.random()*90, y: Math.random()*85 }]);
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  const killBug = (id: number) => {
    setScore(s => s + 1);
    setBugs(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl overflow-hidden relative h-full">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-red-400">Мисливець за вірусами 👾</h3>
        <div className="text-2xl font-bold text-white">Знищено: {score}</div>
      </div>
      {!active ? (
        <button onClick={() => setActive(true)} className="w-full h-64 bg-red-500/20 rounded-2xl border-2 border-dashed border-red-400/50 font-bold hover:bg-red-500/30 transition-all">
          Запустити анти-баг 🚀
        </button>
      ) : (
        <div className="relative h-64 bg-slate-900 rounded-2xl overflow-hidden border border-red-500/30">
          {bugs.map(bug => (
            <button key={bug.id} onClick={() => killBug(bug.id)}
              className="absolute p-2 bg-red-500 rounded-lg animate-pulse"
              style={{ left: `${bug.x}%`, top: `${bug.y}%` }}>👾</button>
          ))}
          <button onClick={() => {setActive(false); setBugs([])}} className="absolute bottom-2 right-2 text-[10px] bg-white/10 px-2 py-1 rounded">Вийти</button>
        </div>
      )}
    </div>
  );
};

export const CodeBreaker: React.FC = () => {
  const emojis = ['💻', '🧶', '👗', '✨', '🎁', '⭐'];
  const [sequence, setSequence] = useState<string[]>([]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState('Натисніть "Старт", щоб зламати код!');

  const startLevel = () => {
    const newSeq = Array.from({ length: 3 + Math.floor(userSequence.length / 3) }, () => emojis[Math.floor(Math.random() * emojis.length)]);
    setSequence(newSeq);
    setUserSequence([]);
    setIsPlaying(true);
    setMessage('Запам\'ятовуй!');
    setTimeout(() => setMessage('Повторюй!'), 2000);
  };

  const handleInput = (emoji: string) => {
    if (message !== 'Повторюй!') return;
    const nextUserSeq = [...userSequence, emoji];
    setUserSequence(nextUserSeq);
    
    if (nextUserSeq[nextUserSeq.length - 1] !== sequence[nextUserSeq.length - 1]) {
      setMessage('Помилка! Спробуй знову ʕ•ᴥ•ʔ');
      setIsPlaying(false);
      return;
    }

    if (nextUserSeq.length === sequence.length) {
      setMessage('Код зламано! Наступний рівень! ✨');
      setTimeout(startLevel, 1000);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl overflow-hidden relative h-full">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-blue-400">Зламай Код ⌨️</h3>
        <p className="text-xs opacity-80">{message}</p>
      </div>
      <div className="flex flex-col items-center justify-center h-64 bg-black/40 rounded-2xl border border-white/10 p-4">
        {isPlaying && message === 'Запам\'ятовуй!' ? (
          <div className="flex gap-2 text-3xl animate-pulse">
            {sequence.map((s, i) => <span key={i}>{s}</span>)}
          </div>
        ) : isPlaying ? (
          <div className="grid grid-cols-3 gap-3">
            {emojis.map((e, i) => (
              <button key={i} onClick={() => handleInput(e)} className="text-2xl p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all">{e}</button>
            ))}
          </div>
        ) : (
          <button onClick={startLevel} className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-600">Старт</button>
        )}
      </div>
    </div>
  );
};

export const FirewallDefense: React.FC = () => {
  const [score, setScore] = useState(0);
  const [packets, setPackets] = useState<{id: number, y: number, x: number, speed: number}[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const spawn = setInterval(() => {
      setPackets(prev => [...prev, { id: Date.now(), y: Math.random() * 80 + 10, x: -10, speed: Math.random() * 2 + 1 }]);
    }, 1200);
    return () => clearInterval(spawn);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const move = setInterval(() => {
      setPackets(prev => {
        const next = prev.map(p => ({ ...p, x: p.x + p.speed }));
        if (next.some(p => p.x > 90)) {
          setActive(false);
          return [];
        }
        return next;
      });
    }, 50);
    return () => clearInterval(move);
  }, [active]);

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl overflow-hidden relative h-full">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-green-400">Захист Картки 🛡️💳</h3>
        <div className="text-2xl font-bold text-white">Відбито: {score}</div>
      </div>
      {!active ? (
        <button onClick={() => {setActive(true); setScore(0)}} className="w-full h-64 bg-green-500/20 rounded-2xl border-2 border-dashed border-green-400/50 font-bold hover:bg-green-500/30">
          Увімкнути фаєрвол ʕ•ᴥ•ʔ
        </button>
      ) : (
        <div className="relative h-64 bg-slate-900 rounded-2xl overflow-hidden border-r-4 border-green-500/50">
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-yellow-400/20 flex items-center justify-center text-xl">💳</div>
          {packets.map(p => (
            <button key={p.id} onClick={() => {setScore(s => s+1); setPackets(prev => prev.filter(item => item.id !== p.id))}}
              className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-white animate-ping"
              style={{ top: `${p.y}%`, left: `${p.x}%` }} />
          ))}
          <p className="absolute bottom-2 left-2 text-[8px] font-mono text-green-500">SYSTEM SECURE</p>
        </div>
      )}
    </div>
  );
};
