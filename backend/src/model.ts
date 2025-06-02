interface RoundInformation {
    expression: string;
    name: string;
    party: string;
    difficulty: number;
    date: string;
    context: string;
    link: string;
}

let currentRoundInformation: RoundInformation = {
    "expression": "placeholder expression",
    "name": "placeholder name",
    "party": "placeholder party",
    "difficulty": 0,
    "date": "placeholder date",
    "context": "placeholder context",
    "link": "placeholder link"
}

// Getting current round information
export const handldeGetCurrentRoundInformation = () => {
    return currentRoundInformation;
};