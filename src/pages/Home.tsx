import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import questions from '../data/questions';

const categories = [
  { id: 1, name: 'Общие положения, нормативно-справочная информация', count: 84 },
  { id: 2, name: 'Планирование', count: 51 },
  { id: 3, name: 'Бюджетирование', count: 48 },
  { id: 4, name: 'Работа с заказами', count: 51 },
  { id: 5, name: 'Закупки', count: 50 },
  { id: 6, name: 'Складское хозяйство', count: 59 },
  { id: 7, name: 'Продажи', count: 46 },
  { id: 8, name: 'Казначейство', count: 52 },
  { id: 9, name: 'Ведение взаиморасчетов', count: 37 },
  { id: 10, name: 'Нормирование', count: 58 },
  { id: 11, name: 'Управление производством', count: 62 },
  { id: 12, name: 'Производство', count: 42 },
  { id: 13, name: 'Оперативный учет', count: 54 },
  { id: 14, name: 'Регламентированный учет', count: 47 },
];

const Home: React.FC = () => {
  const { readinessPercentage, resetProgress, userProgress } = useApp();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  const getLearnedQuestionsCount = () => {
    return questions.filter(question =>
      userProgress.find(p => 
        p.questionId === question.questionNumber && 
        p.categoryId === question.categoryId && 
        p.learnedInTraining
      )
    ).length;
  };

  const getQuestionWord = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'вопросов';
    }

    if (lastDigit === 1) {
      return 'вопрос';
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'вопроса';
    }
    return 'вопросов';
  };

  const learnedCount = getLearnedQuestionsCount();
  const totalCount = 741;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Привет, Пусик!
          </h1>
          <div className="flex flex-wrap items-center justify-center bg-white rounded-2xl shadow-sm px-4 py-3 md:px-6 md:py-4 gap-2 md:gap-3">
            <span className="text-base md:text-lg text-gray-600">Ты выучила</span>
            <div className="px-3 py-1 bg-teal-50 rounded-lg">
              <span className="text-lg md:text-xl font-semibold text-teal-600">{learnedCount}</span>
            </div>
            <span className="text-base md:text-lg text-gray-600">{getQuestionWord(learnedCount)}</span>
            <span className="text-base md:text-lg text-gray-600">из</span>
            <div className="px-3 py-1 bg-gray-50 rounded-lg">
              <span className="text-lg md:text-xl font-semibold text-gray-900">{totalCount}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-8">
          <h2 className="text-base md:text-lg font-medium text-gray-700 mb-4">
            Общий прогресс
          </h2>
          <ProgressBar
            percentage={readinessPercentage}
            size="lg"
          />
        </div>

        <div className="grid gap-4 md:gap-6">
          <Link
            to="/exam"
            className="transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="bg-gradient-to-br from-violet-500 to-indigo-500 rounded-2xl p-5 md:p-8 text-white shadow-lg shadow-violet-500/10 hover:shadow-xl hover:shadow-violet-500/20 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Пробный экзамен</h2>
                  <p className="text-base md:text-lg text-white/90">
                    14 случайных вопросов, 30 минут на выполнение
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 ml-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/practice"
            className="transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-5 md:p-8 text-white shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/20 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Тренировка</h2>
                  <p className="text-base md:text-lg text-white/90">
                    Выбери разделы для практики
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 ml-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          <Link
            to="/categories"
            className="transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-5 md:p-8 text-white shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/20 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Разделы методички</h2>
                  <p className="text-base md:text-lg text-white/90">
                    Изучай вопросы по категориям
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 ml-4">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-8 md:mt-12 flex flex-col items-center gap-6">
          <Link
            to="/guide"
            className="inline-flex items-center px-4 py-2 bg-white rounded-xl shadow-sm text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Руководство пользователя
          </Link>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center px-4 py-2 bg-white rounded-xl shadow-sm text-red-400 hover:text-red-500 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Сбросить весь прогресс
          </button>
        </div>
      </div>

      {/* Модальное окно подтверждения сброса */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Сбросить прогресс?
            </h3>
            <p className="text-gray-600 mb-6">
              Это действие нельзя будет отменить. Весь прогресс обучения и результаты экзаменов будут удалены.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Сбросить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 