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
    "expression": "placeholder expression",
    "name": "placeholder name",
    "party": "placeholder party",
    "difficulty": 0,
    "date": 1000,
    "context": "placeholder context",
    "link": "placeholder link"
}

let selectedColor = "black";
let expressionArray:ExpressionData[] = [];

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

// Getting selected color
export const model_getExpressionArray = () => {
  return expressionArray;
}

// Setting selected color
export const model_setExpressionArray = (newExpressionArray: ExpressionData[]) => {
  expressionArray = newExpressionArray;
}