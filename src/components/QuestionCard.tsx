import React, { useState } from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (correct: boolean, selectedAnswerId: number) => void;
  showCorrectAnswer?: boolean;
  selectedAnswerId?: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  showCorrectAnswer = false,
  selectedAnswerId
}) => {
  const [localSelectedId, setLocalSelectedId] = useState<number | null>(null);

  const handleAnswerClick = (answerId: number) => {
    if (localSelectedId !== null) return; // Предотвращаем повторный выбор
    
    const isCorrect = question.answers.find(a => a.id === answerId)?.isCorrect || false;
    setLocalSelectedId(answerId);
    
    // Добавляем небольшую задержку перед переходом к следующему вопросу
    setTimeout(() => {
      onAnswer(isCorrect, answerId);
      setLocalSelectedId(null); // Сбрасываем выбор
    }, 300);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="text-sm text-gray-600 mb-2">
          Вопрос №{question.id} • Раздел {question.categoryId}
        </div>
        <p className="text-base sm:text-lg font-medium text-gray-900 mb-6">
          {question.text}
        </p>
        <div className="space-y-3">
          {question.answers.map((answer) => {
            const isSelected = localSelectedId === answer.id || selectedAnswerId === answer.id;
            let className = 'p-4 rounded-xl border-2 transition-all duration-200 text-left w-full ';

            if (showCorrectAnswer) {
              if (answer.isCorrect) {
                className += 'bg-green-50 border-green-200 hover:bg-green-100';
              } else if (isSelected) {
                className += 'bg-red-50 border-red-200';
              } else {
                className += 'bg-gray-50 border-gray-200';
              }
            } else {
              if (isSelected) {
                className += 'bg-violet-50 border-violet-200';
              } else {
                className += 'bg-gray-50 border-gray-200 hover:bg-gray-100 cursor-pointer';
              }
            }

            return (
              <button
                key={answer.id}
                className={className}
                onClick={() => !showCorrectAnswer && !localSelectedId && handleAnswerClick(answer.id)}
                disabled={showCorrectAnswer || localSelectedId !== null}
              >
                <div className="flex items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base text-gray-900">
                      {answer.text}
                    </p>
                  </div>
                  {showCorrectAnswer && (
                    <div className="ml-3 flex-shrink-0">
                      {answer.isCorrect ? (
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : isSelected && (
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard; 