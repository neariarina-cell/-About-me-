
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Language } from '../types';

const NewYearAI: React.FC<{ language: Language }> = ({ language }) => {
  const [wish, setWish] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const generateWish = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const prompts = {
        uk: 'Привітай мене з Новим Роком! Згадай, що в мене (Аріни) скоро буде нова швейна машинка та дитяча банківська картка. Підтримай мене, бо завтра в мене забирають ноутбук, а iPad трохи розбитий. Обов’язково використовуй милі текстові смайлики на кшталт (ᵔ◡ᵔ), :з, ʕ•ᴥ•ʔ у тексті.',
        ru: 'Поздравь меня с Новым Годом! Упомяни, что у меня (Арины) скоро будет новая швейная машинка и детская банковская карточка. Поддержи меня, так как завтра у меня забирают ноутбук, а iPad немного разбит. Обязательно используй милые текстовые смайлики вроде (ᵔ◡ᵔ), :з, ʕ•ᴥ•ʔ в тексте.',
        en: 'Wish me a Happy New Year! Mention that I (Arina) will soon have a new sewing machine and a kids bank card. Support me because my laptop is being taken away tomorrow and my iPad is a bit broken. Use cute text emojis like (ᵔ◡ᵔ), :з, ʕ•ᴥ•ʔ.'
      };

      const systemInstructions = {
        uk: 'Ти - дружній святковий помічник Аріни. Твій стиль теплий, підтримуючий. Відповідай українською мовою.',
        ru: 'Ты - дружелюбный праздничный помощник Арины. Твой стиль теплый, поддерживающий. Отвечай на русском языке.',
        en: 'You are Arina\'s friendly holiday assistant. Your style is warm and supportive. Respond in English.'
      };

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompts[language],
        config: {
          systemInstruction: systemInstructions[language],
          temperature: 0.9,
        }
      });
      setWish(response.text || '✨ (ᵔ◡ᵔ)');
    } catch (error) {
      console.error('AI Error:', error);
      const fallback = {
        uk: 'Бажаю тобі чудового Нового Року, Аріно! Багато швів на новій машинці та крутих покупок! :з ʕ•ᴥ•ʔ',
        ru: 'Желаю тебе чудесного Нового Года, Арина! Много швов на новой машинке и крутых покупок! :з ʕ•ᴥ•ʔ',
        en: 'Wishing you a wonderful New Year, Arina! Many stitches on your new machine and cool purchases! :з ʕ•ᴥ•ʔ'
      };
      setWish(fallback[language]);
    } finally {
      setLoading(false);
    }
  };

  const ui = {
    uk: { title: 'ШІ Помічник Аріни', btn: 'Отримати побажання! (ᵔ◡ᵔ)', loading: 'Магія в процесі... ✨' },
    ru: { title: 'ИИ Помощник Арины', btn: 'Получить пожелание! (ᵔ◡ᵔ)', loading: 'Магия в процессе... ✨' },
    en: { title: 'Arina\'s AI Assistant', btn: 'Get a Wish! (ᵔ◡ᵔ)', loading: 'Magic in progress... ✨' }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mt-10 border border-white/20 shadow-2xl max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
        {ui[language].title} 🎄 ʕ•ᴥ•ʔ
      </h3>
      <button 
        onClick={generateWish}
        disabled={loading}
        className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold rounded-full transition-all active:scale-95 disabled:opacity-50 shadow-lg"
      >
        {loading ? ui[language].loading : ui[language].btn}
      </button>
      {wish && (
        <div className="mt-6 p-4 bg-white/20 rounded-xl text-white italic leading-relaxed animate-fade-in border-l-4 border-yellow-400 whitespace-pre-wrap">
          {wish}
        </div>
      )}
    </div>
  );
};

export default NewYearAI;
