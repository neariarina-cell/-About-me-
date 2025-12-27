
import React, { useState } from 'react';
import { Comment } from '../types';

export const FeedbackForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  if (status === 'sent') {
    return (
      <div className="bg-green-500/20 border border-green-500/50 p-6 rounded-2xl text-center animate-bounce">
        <p className="text-xl font-bold">Дякую! Твоє запитання отримано! ✨</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-sm underline">Надіслати ще одне</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-2xl border border-white/20">
      <h3 className="text-xl font-bold mb-4">Маєш запитання до Аріни? 📝</h3>
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Твоє ім'я" 
          required
          className="w-full bg-white/5 border border-white/20 rounded-lg p-3 outline-none focus:border-yellow-400"
        />
        <textarea 
          placeholder="Твоє запитання щодо проектів..." 
          required
          rows={3}
          className="w-full bg-white/5 border border-white/20 rounded-lg p-3 outline-none focus:border-yellow-400"
        ></textarea>
        <button 
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-yellow-400 text-blue-900 font-bold py-3 rounded-lg hover:bg-yellow-300 transition-colors"
        >
          {status === 'sending' ? 'Надсилаємо...' : 'Запитати'}
        </button>
      </div>
    </form>
  );
};

export const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: "Мама", text: "Ти молодець! В тебе все вийде зі швейною машинкою! ❤️", date: "24.12.2024" },
    { id: 2, author: "Друг", text: "Чекаю на перші обновки! Хе-хе", date: "25.12.2024" }
  ]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now(),
      author: "Гість",
      text: newComment,
      date: new Date().toLocaleDateString('uk-UA')
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Коментарі до проектів 💬</h3>
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
        {comments.map(c => (
          <div key={c.id} className="bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-yellow-400">{c.author}</span>
              <span className="text-xs opacity-50">{c.date}</span>
            </div>
            <p className="text-sm">{c.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        <input 
          type="text" 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Напиши свій відгук..."
          className="flex-1 bg-white/5 border border-white/20 rounded-lg p-3 outline-none"
        />
        <button onClick={addComment} className="bg-white/20 px-6 rounded-lg hover:bg-white/30 transition-colors">
          Додати
        </button>
      </div>
    </div>
  );
};
