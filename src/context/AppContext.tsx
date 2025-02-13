import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress, ExamResult, AppContextType } from '../types';
import questionsData from '../data/questions';

interface RawQuestion {
  text: string;
  options: string[];
  correctAnswer: number;
  categoryId: number;
  questionNumber: number;
}

const transformQuestions = (rawQuestions: RawQuestion[]): UserProgress[] => {
  return rawQuestions.map((q) => ({
    questionId: q.questionNumber,
    categoryId: q.categoryId,
    correctAnswersCount: 0,
    lastAnsweredAt: '',
    learnedInTraining: false
  }));
};

const questions = transformQuestions(questionsData);

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress[]>(() => {
    const saved = localStorage.getItem('userProgress');
    return saved ? JSON.parse(saved) : [];
  });

  const [examHistory, setExamHistory] = useState<ExamResult[]>(() => {
    const saved = localStorage.getItem('examHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [readinessPercentage, setReadinessPercentage] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
    calculateReadinessPercentage();
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('examHistory', JSON.stringify(examHistory));
  }, [examHistory]);

  const calculateReadinessPercentage = () => {
    const totalQuestions = 741; // Общее количество вопросов
    const learnedQuestions = userProgress.filter(p => p.learnedInTraining).length;
    setReadinessPercentage(Math.round((learnedQuestions / totalQuestions) * 100));
  };

  const addProgress = (progress: UserProgress) => {
    setUserProgress(prev => {
      const existingIndex = prev.findIndex(
        p => p.questionId === progress.questionId && p.categoryId === progress.categoryId
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = progress;
        return updated;
      }

      return [...prev, progress];
    });
  };

  const resetProgress = () => {
    setUserProgress([]);
    setExamHistory([]);
  };

  const addExamResult = (result: ExamResult) => {
    setExamHistory(prev => [...prev, result]);
  };

  return (
    <AppContext.Provider
      value={{
        userProgress,
        examHistory,
        readinessPercentage,
        addProgress,
        resetProgress,
        addExamResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 