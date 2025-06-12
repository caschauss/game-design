type Party = "SPD" | "CDU" | "FW" | "GRU" | "AfD" | "LNK" | "BSW" | "FDP" | "PLACEHOLDER" | "FINISHED";

interface ExpressionData {
  expression: string;
  name: string;
  party: Party;
  difficulty: number;
  date: number;
  context?: string;
  link: string;
}

let roundInformation: ExpressionData = {
  "expression": "placeholder expression",
  "name": "placeholder name",
  "party": "PLACEHOLDER",
  "difficulty": 0,
  "date": 1000,
  "context": "placeholder context",
  "link": "placeholder link"
}

let selectedColor = "black";
let expressionArray: ExpressionData[] = [];
let correctParty: Party = "SPD";

// Getting current round information
export const model_getRoundInformation = () => {
  return roundInformation;
};

// Setting current round information
export const model_setRoundInformation = (newRoundInformation: ExpressionData) => {
  roundInformation = newRoundInformation;
};

// Getting selected color
export const model_getSelectedColor = () => {
  return selectedColor;
}

// Setting selected color
export const model_setSelectedColor = (newSelectedColor: string) => {
  selectedColor = newSelectedColor;
}

// Getting correct party
export const model_getCorrectParty = () => {
  return correctParty;
}

// Setting correct party
export const model_setCorrectParty = (newCorrectParty: Party) => {
  correctParty = newCorrectParty;
}

// Getting selected color
export const model_getExpressionArray = () => {
  return expressionArray;
}

// Setting selected color
export const model_setExpressionArray = (newExpressionArray: ExpressionData[]) => {
  expressionArray = newExpressionArray;
}