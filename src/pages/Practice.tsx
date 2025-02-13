import React, { useState, useMemo } from 'react';
import { Question } from '../types';
import QuestionCard from '../components/QuestionCard';
import PracticeResults from '../components/PracticeResults';
import { useApp } from '../context/AppContext';
import useQuestions from '../hooks/useQuestions';

const categoryNames = [
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

const Practice: React.FC = () => {
  const { userProgress, addProgress } = useApp();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [practiceStarted, setPracticeStarted] = useState(false);
  const [practiceFinished, setPracticeFinished] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: number; correct: boolean; selectedAnswerId: number; question: Question }[]>([]);

  // Получаем все вопросы один раз
  const { questions: allQuestions } = useQuestions();

  // Фильтруем вопросы по выбранным категориям
  const filteredQuestions = useMemo(() => {
    if (selectedCategories.length === 0) return [];
    return allQuestions.filter(q => selectedCategories.includes(q.categoryId));
  }, [allQuestions, selectedCategories]);

  // Вычисляем количество вопросов для каждой категории
  const categories = useMemo(() => {
    return categoryNames.map(category => {
      const categoryQuestions = allQuestions.filter(q => q.categoryId === category.id);
      console.log(`Категория ${category.id}: ${categoryQuestions.length} вопросов`);
      return {
        ...category,
        count: categoryQuestions.length
      };
    });
  }, [allQuestions]);

  const practiceQuestions = useMemo(() => {
    if (selectedCategories.length === 0) return [];
    
    console.log('Вопросы в выбранных категориях:', filteredQuestions.length);
    
    if (filteredQuestions.length === 0) return [];
    
    // Фильтруем неизученные вопросы
    const unansweredQuestions = filteredQuestions.filter(question => {
      const progress = userProgress.find(p => 
        p.questionId === question.id && 
        p.categoryId === question.categoryId
      );
      const isUnanswered = !progress || !progress.learnedInTraining;
      return isUnanswered;
    });
    console.log('Неизученные вопросы:', unansweredQuestions.length);

    if (unansweredQuestions.length === 0) return [];
    
    // Если неизученных вопросов меньше или равно 10, берем их все
    if (unansweredQuestions.length <= 10) {
      // Перемешиваем вопросы, чтобы они шли в случайном порядке
      return [...unansweredQuestions].sort(() => Math.random() - 0.5);
    }
    
    // Иначе случайно выбираем 10 вопросов
    return [...unansweredQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  }, [filteredQuestions, selectedCategories, userProgress]);

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleStartPractice = () => {
    // Проверяем, есть ли неизученные вопросы и что они корректно загружены
    if (selectedCategories.length === 0 || !practiceQuestions || !Array.isArray(practiceQuestions) || practiceQuestions.length === 0) {
      return;
    }
    
    // Проверяем, что первый вопрос существует
    if (!practiceQuestions[0]) {
      return;
    }
    
    setPracticeStarted(true);
    setPracticeFinished(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (correct: boolean, selectedAnswerId: number) => {
    if (!practiceQuestions || practiceQuestions.length === 0) return;
    
    const currentQuestion = practiceQuestions[currentQuestionIndex];
    if (!currentQuestion) return;

    // Сохраняем ответ вместе с вопросом
    const answer = { 
      questionId: currentQuestion.id, 
      correct, 
      selectedAnswerId,
      question: currentQuestion
    };
    setAnswers(prev => [...prev, answer]);

    // Обновляем прогресс для текущей категории
    addProgress({
      questionId: currentQuestion.id,
      categoryId: currentQuestion.categoryId,
      learnedInTraining: correct
    });

    // Проверяем, есть ли следующий вопрос
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < practiceQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setPracticeFinished(true);
    }
  };

  const handleBack = () => {
    setPracticeStarted(false);
    setPracticeFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedCategories([]);
    setAnswers([]);
  };

  if (practiceFinished) {
    return (
      <PracticeResults
        questions={answers.map(a => a.question)}
        answers={answers}
        onBack={handleBack}
      />
    );
  }

  if (practiceStarted && practiceQuestions.length > 0) {
    const currentQuestion = practiceQuestions[currentQuestionIndex];
    
    // Добавляем проверку на существование текущего вопроса
    if (!currentQuestion) {
      setPracticeFinished(true);
      return null;
    }
    
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <button
            onClick={handleBack}
            className="mb-6 text-primary hover:text-primary-600 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Вернуться к выбору разделов
          </button>
          
          <div className="mb-4 text-center">
            <div className="text-lg font-medium text-gray-900 mb-1">
              Вопрос {currentQuestionIndex + 1} из {practiceQuestions.length}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              Вопрос №{currentQuestion.id} (Раздел {currentQuestion.categoryId})
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${(currentQuestionIndex + 1) / practiceQuestions.length * 100}%` }}
              />
            </div>
          </div>
          
          <QuestionCard
            key={`${currentQuestionIndex}-${currentQuestion.id}`}
            question={currentQuestion}
            onAnswer={handleAnswer}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Тренировка
        </h1>
        <p className="text-gray-600 mb-8">
          Выберите один или несколько разделов для тренировки. Будет сформирован набор из неизученных вопросов (максимум 10).
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {categories.map((category) => {
            const isSelected = selectedCategories.includes(category.id);
            const categoryQuestions = allQuestions.filter(q => q.categoryId === category.id);
            const progress = categoryQuestions.filter(
              question => userProgress.find(p => 
                p.questionId === question.id && 
                p.categoryId === question.categoryId && 
                p.learnedInTraining
              )
            ).length;

            // Проверяем, все ли вопросы в категории изучены
            const isFullyLearned = progress === categoryQuestions.length;
            
            // Определяем классы для стилизации
            const containerClasses = `p-4 flex items-center space-x-4 ${
              isFullyLearned 
                ? 'bg-gray-50 opacity-50 cursor-not-allowed' 
                : 'cursor-pointer hover:bg-gray-50'
            } transition-colors`;

            return (
              <div
                key={category.id}
                className={containerClasses}
                onClick={() => !isFullyLearned && handleCategoryToggle(category.id)}
              >
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={isFullyLearned}
                    onChange={() => {}}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-gray-900 truncate">
                    {category.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">
                      Изучено {progress} из {categoryQuestions.length}
                    </p>
                    {isFullyLearned && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Раздел изучен
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {selectedCategories.length === 0 && 'Выберите хотя бы один раздел'}
          </div>
          <button
            onClick={handleStartPractice}
            disabled={selectedCategories.length === 0 || practiceQuestions.length === 0}
            className={`btn ${
              selectedCategories.length > 0 && practiceQuestions.length > 0
                ? 'bg-primary hover:bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            } px-6 py-2 rounded-lg font-medium transition-colors`}
          >
            Начать тренировку
          </button>
        </div>
      </div>
    </div>
  );
};

export default Practice; 