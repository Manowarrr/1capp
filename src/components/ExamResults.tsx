import React from 'react';
import { ExamResult, Question } from '../types';

interface ExamResultsProps {
  result: ExamResult;
  questions: Question[];
  onClose: () => void;
}

const ExamResults: React.FC<ExamResultsProps> = ({ result, questions, onClose }) => {
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

  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);

  // Получаем названия категорий
  const categories = [
    { id: 1, name: 'Общие положения, нормативно-справочная информация' },
    { id: 2, name: 'Планирование' },
    { id: 3, name: 'Бюджетирование' },
    { id: 4, name: 'Работа с заказами' },
    { id: 5, name: 'Закупки' },
    { id: 6, name: 'Складское хозяйство' },
    { id: 7, name: 'Продажи' },
    { id: 8, name: 'Казначейство' },
    { id: 9, name: 'Ведение взаиморасчетов' },
    { id: 10, name: 'Нормирование' },
    { id: 11, name: 'Управление производством' },
    { id: 12, name: 'Производство' },
    { id: 13, name: 'Оперативный учет' },
    { id: 14, name: 'Регламентированный учет' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Общая статистика */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className={`text-center mb-8 ${result.passed ? 'text-emerald-600' : 'text-red-600'}`}>
              <div className="mb-4">
                {result.passed ? (
                  <svg className="w-16 h-16 mx-auto text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {result.passed ? 'Экзамен сдан!' : 'Экзамен не сдан'}
              </h2>
              {result.passed && (
                <p className="text-base opacity-90">
                  Поздравляем! Вы успешно сдали экзамен.
                </p>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Дата:</span>
                <span className="font-medium">{formatDate(result.date)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Правильных ответов:</span>
                <span className={`font-medium ${result.passed ? 'text-emerald-600' : 'text-red-600'}`}>
                  {result.correctAnswers} из {result.totalQuestions}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Процент правильных ответов:</span>
                <span className={`font-medium ${result.passed ? 'text-emerald-600' : 'text-red-600'}`}>
                  {percentage}%
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${result.passed ? 'bg-emerald-500' : 'bg-red-500'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Список вопросов с ответами */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Подробные результаты:</h3>
            {result.questions.map((answer, index) => {
              const question = questions.find(q => q.id === answer.questionId);
              if (!question) return null;
              
              const category = categories.find(c => c.id === question.categoryId);

              return (
                <div
                  key={question.id}
                  className={`bg-white rounded-xl shadow-sm p-4 sm:p-6 ${
                    answer.correct
                      ? 'border-2 border-green-200'
                      : 'border-2 border-red-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        answer.correct ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-2 mb-4">
                        <div className="text-sm text-gray-600 break-words">
                          Вопрос №{question.id} • Раздел {question.categoryId}
                        </div>
                        <div className="text-sm font-medium text-gray-800 break-words">
                          {category?.name || `Раздел ${question.categoryId}`}
                        </div>
                        <span className={`self-start px-2 py-1 rounded-full text-sm font-medium ${
                          answer.correct 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {answer.correct ? 'Верно' : 'Неверно'}
                        </span>
                      </div>
                      <p className="text-base sm:text-lg font-medium mb-4 break-words">{question.text}</p>
                      
                      <div className="space-y-2">
                        {question.answers.map(a => {
                          const isSelected = a.id === answer.selectedAnswerId;
                          const isCorrect = a.isCorrect;
                          
                          let className = 'p-3 rounded-lg ';
                          if (isSelected && isCorrect) {
                            className += 'bg-green-100 border-2 border-green-300';
                          } else if (isSelected && !isCorrect) {
                            className += 'bg-red-100 border-2 border-red-300';
                          } else if (isCorrect) {
                            className += 'bg-green-50 border-2 border-green-200';
                          } else {
                            className += 'bg-gray-50 border border-gray-200';
                          }

                          return (
                            <div key={a.id} className={className}>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <span className={`break-words ${isSelected || isCorrect ? 'font-medium' : ''}`}>
                                  {a.text}
                                </span>
                                <div className="flex flex-wrap items-center gap-2">
                                  {isSelected && (
                                    <span className={`text-sm font-medium whitespace-nowrap ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                      Ваш ответ
                                    </span>
                                  )}
                                  {isCorrect && (
                                    <span className="text-sm font-medium text-green-600 whitespace-nowrap">
                                      Правильный ответ
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Кнопка возврата */}
          <div className="flex justify-center mt-8">
            <button
              onClick={onClose}
              className={`btn ${
                result.passed 
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-gray-600 hover:bg-gray-700'
              } text-white px-6 py-2 rounded-lg font-medium transition-colors`}
            >
              {result.passed ? 'Вернуться на главную' : 'Попробовать снова'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResults; 