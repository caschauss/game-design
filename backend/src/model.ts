interface ExpressionData {
  expression: string;
  name: string;
  party: string;
  difficulty: number;
  date: number;
  context?: string;
  link: string;
}

let roundInformation: ExpressionData = {
  expression: "placeholder expression",
  name: "placeholder name",
  party: "PLACEHOLDER",
  difficulty: 0,
  date: 1000,
  context: "placeholder context",
  link: "placeholder link",
};

let selectedColor = "black";
let expressionArray: ExpressionData[] = [];
let correctParty: string = "SPD";
let currentScore: number = 0;
let currentDifficulty: number = 0;

// Getting current round information
export const model_getRoundInformation = () => {
  return roundInformation;
};

// Setting current round information
export const model_setRoundInformation = (
  newRoundInformation: ExpressionData,
) => {
  roundInformation = newRoundInformation;
};

// Getting selected color
export const model_getSelectedColor = () => {
  return selectedColor;
};

// Setting selected color
export const model_setSelectedColor = (newSelectedColor: string) => {
  selectedColor = newSelectedColor;
};

// Getting correct party
export const model_getCorrectParty = () => {
  return correctParty;
};

// Setting correct party
export const model_setCorrectParty = (newCorrectParty: string) => {
  correctParty = newCorrectParty;
};

// Getting selected color
export const model_getExpressionArray = () => {
  return expressionArray;
};

// Setting selected color
export const model_setExpressionArray = (
  newExpressionArray: ExpressionData[],
) => {
  expressionArray = newExpressionArray;
};

// Getting current score
export const model_getCurrentScore = () => {
  return currentScore;
};

// Setting current score
export const model_setCurrentScore = (newCurrentScore: number) => {
  currentScore = newCurrentScore;
};

export const setDifficulty = (newDifficulty: number) => {
  currentDifficulty = newDifficulty;
};

export const getDifficulty = () => currentDifficulty;
