export type ScoreItem = {
  score: number;
  outOf: number;
};

export type QuizItem = {
  id: number;
  question?: string;
  answers: string[];
  multiple_correct_answers?: boolean;
  correct_answers: boolean[];
  tags?: { name: string }[];
  category?: string;
  difficulty?: string;
};
