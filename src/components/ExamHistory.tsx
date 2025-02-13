import React from 'react';
import { ExamResult } from '../types';

interface ExamHistoryProps {
  results: ExamResult[];
}

const ExamHistory: React.FC<ExamHistoryProps> = ({ results }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (results.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Пока нет пройденных экзаменов
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => (
        <div
          key={result.date}
          className={`card ${
            result.passed ? 'border-green-200' : 'border-red-200'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">
              {formatDate(result.date)}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-sm font-medium ${
                result.passed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {result.passed ? 'Сдан' : 'Не сдан'}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Правильных ответов:</span>
              <span className="font-medium">
                {result.correctAnswers} из {result.totalQuestions}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Процент:</span>
              <span
                className={`font-medium ${
                  result.passed ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {Math.round((result.correctAnswers / result.totalQuestions) * 100)}%
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-500">
              Попытка #{results.length - index}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExamHistory; 