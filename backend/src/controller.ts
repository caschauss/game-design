import expressionData from './expressions.json';
import { model_getExpressionArray, model_setCorrectParty, model_setExpressionArray, model_setRoundInformation } from './model';

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

// Reads and shuffles expressions to model
export const controller_readExpressions = () => {
    let newExpressionArray: ExpressionData[] = [];
    expressionData.forEach(data => {
        const expression: ExpressionData = {
            expression: data.expression,
            name: data.name,
            party: data.party as Party, // Type Assertion
            difficulty: data.difficulty,
            date: data.date,
            context: data.context,
            link: data.link
        };
        newExpressionArray.push(expression);
    });

    // Shuffle Array Content
    for (let i = newExpressionArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newExpressionArray[i], newExpressionArray[j]] = [newExpressionArray[j], newExpressionArray[i]];
    }

    model_setExpressionArray(newExpressionArray);
}