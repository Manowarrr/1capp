import React from 'react';
import { Question } from '../types';

interface PracticeResultsProps {
  questions: Question[];
  answers: { 
    questionId: number; 
    correct: boolean; 
    selectedAnswerId: number;
    question: Question;
  }[];
  onBack: () => void;
}

const PracticeResults: React.FC<PracticeResultsProps> = ({
  questions,
  answers,
  onBack,
}) => {
  const correctAnswers = answers.filter(a => a.correct).length;
  const totalQuestions = answers.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

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
            <h2 className="text-2xl font-bold mb-6 text-center">Тренировка завершена!</h2>
            <div className="space-y-4 mb-8 text-center">
              <div className="text-lg">
                Правильных ответов: <span className="font-bold text-primary">{correctAnswers}</span> из <span className="font-bold">{totalQuestions}</span>
              </div>
              <div className="text-lg">
                Процент правильных ответов: <span className="font-bold text-primary">{percentage}%</span>
              </div>
            </div>
          </div>

          {/* Список вопросов с ответами */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">Подробные результаты:</h3>
            {answers.map((answer, index) => {
              const question = answer.question;
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
              onClick={onBack}
              className="px-6 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium transition-colors"
            >
              Вернуться к выбору разделов
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeResults; 