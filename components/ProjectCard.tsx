
import React from 'react';
import { Project, Language } from '../types';

const ProjectCard: React.FC<{ project: Project, language: Language }> = ({ project, language }) => {
  const labels = {
    uk: { goal: 'Мета:', stages: 'Етапи ʕ•ᴥ•ʔ:', results: 'Очікування :з:', progress: 'Готовність' },
    ru: { goal: 'Цель:', stages: 'Этапы ʕ•ᴥ•ʔ:', results: 'Ожидание :з:', progress: 'Готовность' },
    en: { goal: 'Goal:', stages: 'Stages ʕ•ᴥ•ʔ:', results: 'Expectations :з:', progress: 'Progress' }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl">{project.icon}</span>
        <h3 className="text-3xl font-bold text-yellow-300">{project.title}</h3>
      </div>
      
      <div className="space-y-6 flex-1">
        <div>
          <h4 className="text-xl font-semibold text-white/90 mb-2 border-b border-white/10 pb-1">{labels[language].goal}</h4>
          <p className="text-white/80 italic">{project.goal}</p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white/90 mb-2 border-b border-white/10 pb-1">{labels[language].stages}</h4>
          <ul className="list-disc list-inside text-white/80 space-y-1">
            {project.stages.map((stage, index) => (
              <li key={index}>{stage}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-white/90 mb-2 border-b border-white/10 pb-1">{labels[language].results}</h4>
          <p className="text-white/80">{project.results}</p>
        </div>
      </div>

      <div className="pt-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-white/70">{labels[language].progress}</span>
          <span className="text-sm font-bold text-yellow-300">{project.progress}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden border border-white/10">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-1000 ease-out"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
