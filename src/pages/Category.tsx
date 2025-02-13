import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import useQuestions from '../hooks/useQuestions';

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

const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const categoryId = Number(id);
  const category = categories.find((c) => c.id === categoryId);
  const { questions, loading, error } = useQuestions([categoryId]);
  const { userProgress } = useApp();
  const [activeQuestionId, setActiveQuestionId] = React.useState<number | null>(null);

  const isQuestionLearned = (questionId: number) => {
    const progress = userProgress.find(p => 
      p.questionId === questionId && 
      p.categoryId === categoryId && 
      p.learnedInTraining
    );
    return progress?.learnedInTraining || false;
  };

  const scrollToQuestion = (questionId: number) => {
    const element = document.getElementById(`question-${questionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveQuestionId(questionId);
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-600">
          Категория не найдена
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка вопросов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          Ошибка при загрузке вопросов
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32 md:pb-20">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/categories" className="text-primary hover:text-primary/80 mb-4 inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Назад к разделам
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">
            {category.name}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:gap-8">
          {/* Основной контент */}
          <div className="flex-1 space-y-4 order-1 md:order-2">
            {questions.map((question) => (
              <div
                id={`question-${question.id}`}
                key={question.id}
                className={`bg-white rounded-xl p-6 shadow-sm border transition-all ${
                  isQuestionLearned(question.id)
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-500">
                    Вопрос {question.id}
                  </div>
                  {isQuestionLearned(question.id) && (
                    <div className="flex items-center text-emerald-600 text-sm font-medium">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Изучено
                    </div>
                  )}
                </div>
                <div className="text-lg font-medium mb-4">
                  {question.text}
                </div>
                <div className="space-y-2">
                  {question.answers.map((answer, index) => (
                    <div
                      key={answer.id}
                      className={`p-3 rounded-lg text-sm ${
                        answer.isCorrect
                          ? 'bg-emerald-100/50 text-emerald-900'
                          : 'bg-gray-100/50 text-gray-700'
                      }`}
                    >
                      {index + 1}. {answer.text}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Десктопная боковая навигация */}
          <div className="hidden md:block w-64 flex-shrink-0 order-2 md:order-1">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 sticky top-4">
              <div className="text-sm font-medium text-gray-500 mb-3">
                Быстрый доступ к вопросам
              </div>
              <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => scrollToQuestion(question.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeQuestionId === question.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100'
                    } ${
                      isQuestionLearned(question.id)
                        ? 'text-emerald-600 font-medium'
                        : 'text-gray-600'
                    }`}
                  >
                    Вопрос {index + 1}
                    {isQuestionLearned(question.id) && (
                      <svg className="w-4 h-4 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильная навигация внизу */}
      <div className="fixed bottom-16 left-0 right-0 md:hidden bg-white border-t border-gray-100 shadow-lg">
        <div className="px-4 py-3">
          <div className="overflow-x-auto">
            <div className="flex space-x-2 min-w-max pb-2">
              {questions.map((question, index) => (
                <button
                  key={question.id}
                  onClick={() => scrollToQuestion(question.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    activeQuestionId === question.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  } ${
                    isQuestionLearned(question.id)
                      ? 'text-emerald-600 font-medium'
                      : 'text-gray-600'
                  }`}
                >
                  <span>Вопрос {index + 1}</span>
                  {isQuestionLearned(question.id) && (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category; 