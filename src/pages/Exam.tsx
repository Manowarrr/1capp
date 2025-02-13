import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Question, ExamResult, ExamAnswer } from '../types';
import questions from '../data/questions';
import QuestionCard from '../components/QuestionCard';

const QUESTIONS_COUNT = 14;
const PASS_THRESHOLD = 12;

const getRandomQuestions = (count: number): Question[] => {
  // Сначала преобразуем все вопросы в нужный формат
  const formattedQuestions = questions.map(q => ({
    id: q.questionNumber,
    text: q.text,
    categoryId: q.categoryId,
    answers: q.options.map((text, index) => ({
      id: index,
      text,
      isCorrect: index === q.correctAnswer
    }))
  }));

  // Группируем вопросы по категориям
  const questionsByCategory = formattedQuestions.reduce((acc, question) => {
    if (!acc[question.categoryId]) {
      acc[question.categoryId] = [];
    }
    acc[question.categoryId].push(question);
    return acc;
  }, {} as Record<number, Question[]>);

  // Получаем список всех категорий
  const categories = Object.keys(questionsByCategory).map(Number);

  // Создаем массив для результата
  const result: Question[] = [];
  
  // Продолжаем выбирать вопросы, пока не наберем нужное количество
  while (result.length < count) {
    // Выбираем случайную категорию
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);
    const categoryId = categories[randomCategoryIndex];
    const categoryQuestions = questionsByCategory[categoryId];

    if (categoryQuestions && categoryQuestions.length > 0) {
      // Выбираем случайный вопрос из категории
      const randomQuestionIndex = Math.floor(Math.random() * categoryQuestions.length);
      const selectedQuestion = categoryQuestions[randomQuestionIndex];

      // Проверяем, не выбран ли уже этот вопрос
      if (!result.some(q => q.id === selectedQuestion.id)) {
        result.push(selectedQuestion);
        // Удаляем выбранный вопрос из доступных
        categoryQuestions.splice(randomQuestionIndex, 1);
      }

      // Если в категории не осталось вопросов, удаляем категорию
      if (categoryQuestions.length === 0) {
        categories.splice(randomCategoryIndex, 1);
      }
    }
  }

  return result;
};

const Exam: React.FC = () => {
  const navigate = useNavigate();
  const { addExamResult, examHistory, userProgress, addProgress } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [examQuestions] = useState(() => getRandomQuestions(QUESTIONS_COUNT));
  const [answers, setAnswers] = useState<ExamAnswer[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (correct: boolean, selectedAnswerId: number) => {
    const currentQuestion = examQuestions[currentQuestionIndex];

    // Проверяем, был ли вопрос ранее выучен
    const questionProgress = userProgress.find(
      p => p.questionId === currentQuestion.id && 
           p.categoryId === currentQuestion.categoryId && 
           p.learnedInTraining
    );

    // Если ответ неверный и вопрос был выучен, сбрасываем статус "выучено"
    if (!correct && questionProgress) {
      addProgress({
        questionId: currentQuestion.id,
        categoryId: currentQuestion.categoryId,
        learnedInTraining: false
      });
    }

    const answer: ExamAnswer = {
      questionId: currentQuestion.id,
      selectedAnswerId,
      correct
    };

    setAnswers(prev => [...prev, answer]);

    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishExam();
    }
  };

  const finishExam = () => {
    if (isFinished) return;
    
    setIsFinished(true);
    const correctAnswers = answers.filter(a => a.correct).length;
    const result: ExamResult = {
      date: new Date().toISOString(),
      questions: answers.map((answer, index) => ({
        ...answer,
        question: examQuestions[index]
      })),
      correctAnswers,
      totalQuestions: QUESTIONS_COUNT,
      passed: correctAnswers >= PASS_THRESHOLD
    };

    addExamResult(result);
    navigate(`/exam/results/${examHistory.length}`);
  };

  const currentQuestion = examQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
              Пробный экзамен
            </h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-center text-sm text-gray-500 mb-3">
              <span>Вопрос {currentQuestionIndex + 1} из {QUESTIONS_COUNT}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-2.5 rounded-full bg-violet-500 transition-all duration-300 ease-out"
                style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS_COUNT) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <QuestionCard
            key={`${currentQuestionIndex}-${currentQuestion.id}`}
            question={currentQuestion}
            onAnswer={handleAnswer}
            showCorrectAnswer={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Exam; 