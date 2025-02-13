import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ExamResults from '../components/ExamResults';
import { Question } from '../types';

const ExamResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { examHistory } = useApp();

  if (!id || !examHistory || !examHistory[parseInt(id)]) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Результаты не найдены
          </h1>
          <button
            onClick={() => navigate('/exam')}
            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Вернуться к экзаменам
          </button>
        </div>
      </div>
    );
  }

  const result = examHistory[parseInt(id)];
  // Используем сохраненные вопросы из результата
  const questions = result.questions.map(q => q.question);

  return (
    <ExamResults
      result={result}
      questions={questions}
      onClose={() => navigate('/exam')}
    />
  );
};

export default ExamResultPage; 