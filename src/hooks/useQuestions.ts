import { useMemo } from 'react';
import { Question } from '../types';
import questionsData from '../data/questions';

interface RawQuestion {
  text: string;
  options: string[];
  correctAnswer: number;
  categoryId: number;
  questionNumber: number;
}

const transformQuestions = (rawQuestions: RawQuestion[]): Question[] => {
  return rawQuestions.map((q) => ({
    id: q.questionNumber,
    text: q.text,
    categoryId: q.categoryId,
    answers: q.options.map((text, index) => ({
      id: index,
      text,
      isCorrect: index === q.correctAnswer,
    })),
  }));
};

export const useQuestions = (categoryIds?: number[]) => {
  const questions = useMemo(() => {
    const allQuestions = transformQuestions(questionsData);
    
    // Если указаны конкретные категории, фильтруем вопросы только из этих категорий
    if (categoryIds && categoryIds.length > 0) {
      return allQuestions.filter(q => categoryIds.includes(q.categoryId));
    }
    
    return allQuestions;
  }, [categoryIds?.join(',')]);

  return {
    questions,
    loading: false,
    error: null,
    getRandomQuestions: (count: number) => {
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
  };
};

export default useQuestions; 