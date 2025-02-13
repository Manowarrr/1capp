export interface Question {
  id: number;
  text: string;
  answers: Answer[];
  categoryId: number;
}

export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export interface Category {
  id: number;
  name: string;
  questionCount: number;
}

export interface UserProgress {
  questionId: number;
  categoryId: number;
  learnedInTraining: boolean;
}

export interface ExamAnswer {
  questionId: number;
  selectedAnswerId: number;
  correct: boolean;
}

export interface ExamAnswerWithQuestion extends ExamAnswer {
  question: Question;
}

export interface ExamResult {
  date: string;
  questions: ExamAnswerWithQuestion[];
  correctAnswers: number;
  totalQuestions: number;
  passed: boolean;
}

export interface AppContextType {
  userProgress: UserProgress[];
  examHistory: ExamResult[];
  readinessPercentage: number;
  addProgress: (progress: UserProgress) => void;
  resetProgress: () => void;
  addExamResult: (result: ExamResult) => void;
} 