interface RoundInformation {
    expression: string;
    name: string;
    party: string;
    difficulty: number;
    date: string;
    context: string;
    link: string;
}

let roundInformation: RoundInformation = {
    "expression": "placeholder expression",
    "name": "placeholder name",
    "party": "placeholder party",
    "difficulty": 0,
    "date": "placeholder date",
    "context": "placeholder context",
    "link": "placeholder link"
}

let selectedColor = "black";

// Getting current round information
export const model_getRoundInformation = () => {
    return roundInformation;
};

// Setting current round information
export const model_setRoundInformation = (newRoundInformation: RoundInformation) => {
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