type Question = {
  title: string;
  answers?: {
    title: string;
    isCorrect: boolean;
  }[];
};

export default Question;
