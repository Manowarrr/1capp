import React from 'react';
import { ExamResult, UserProgress } from '../types';
import ProgressBar from './ProgressBar';

interface StatisticsProps {
  userProgress: UserProgress[];
  examResults: ExamResult[];
  totalQuestions: number;
}

const Statistics: React.FC<StatisticsProps> = ({
  userProgress,
  examResults,
  totalQuestions,
}) => {
  const learnedQuestions = userProgress.filter(
    (p) => p.learnedInTraining
  ).length;

  const inProgressQuestions = userProgress.filter(
    (p) => !p.learnedInTraining
  ).length;

  const totalExams = examResults.length;
  const passedExams = examResults.filter((r) => r.passed).length;
  const averageScore =
    examResults.length > 0
      ? Math.round(
          (examResults.reduce(
            (acc, r) => acc + (r.correctAnswers / r.totalQuestions) * 100,
            0
          ) /
            examResults.length) *
            100
        ) / 100
      : 0;

  const bestScore =
    examResults.length > 0
      ? Math.max(
          ...examResults.map((r) => (r.correctAnswers / r.totalQuestions) * 100)
        )
      : 0;

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Прогресс обучения
        </h3>
        <div className="space-y-4">
          <div>
            <ProgressBar
              percentage={(learnedQuestions / totalQuestions) * 100}
              label="Выучено вопросов"
              size="lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {learnedQuestions}
              </div>
              <div className="text-sm text-gray-500">Выучено</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                {inProgressQuestions}
              </div>
              <div className="text-sm text-gray-500">В процессе</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Статистика экзаменов
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{totalExams}</div>
            <div className="text-sm text-gray-500">Всего попыток</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{passedExams}</div>
            <div className="text-sm text-gray-500">Успешных</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {averageScore}%
            </div>
            <div className="text-sm text-gray-500">Средний результат</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">
              {bestScore}%
            </div>
            <div className="text-sm text-gray-500">Лучший результат</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 