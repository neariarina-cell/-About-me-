
import React, { useState, useEffect } from 'react';
import { TimeLeft, Language } from '../types';

const CountdownTimer: React.FC<{ language: Language }> = ({ language }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const nextYear = new Date().getFullYear() + 1;
    const difference = +new Date(`01/01/${nextYear}`) - +new Date();
    
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const labels = {
    uk: { d: 'Днів', h: 'Годин', m: 'Хвилин', s: 'Секунд' },
    ru: { d: 'Дней', h: 'Часов', m: 'Минут', s: 'Секунд' },
    en: { d: 'Days', h: 'Hours', m: 'Mins', s: 'Secs' }
  };

  const TimerBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-white/20 backdrop-blur-md rounded-xl p-4 min-w-[80px] border border-white/30 shadow-lg">
      <span className="text-4xl md:text-5xl font-bold text-white">{value}</span>
      <span className="text-xs md:text-sm uppercase text-white/80">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-4 my-8">
      <TimerBox value={timeLeft.days} label={labels[language].d} />
      <TimerBox value={timeLeft.hours} label={labels[language].h} />
      <TimerBox value={timeLeft.minutes} label={labels[language].m} />
      <TimerBox value={timeLeft.seconds} label={labels[language].s} />
    </div>
  );
};

export default CountdownTimer;
