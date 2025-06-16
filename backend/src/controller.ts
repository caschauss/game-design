import expressionData from './expressions.json';
import { model_getExpressionArray, model_setCorrectParty, model_setExpressionArray, model_setRoundInformation } from './model';

interface ExpressionData {
    expression: string;
    name: string;
    party: string;
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
            party: data.party,
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

export const controller_newRound = () => {
    let expressionArray: ExpressionData[] = model_getExpressionArray();

    if (expressionArray.length > 0) {
        let lastElement: ExpressionData = expressionArray[expressionArray.length - 1];


        if (lastElement === undefined) {
            // Fallback Expression in case Array is empty (game finished)
            model_setRoundInformation({
                expression: "GAME FINISHED",
                name: "GAME FINISHED",
                party: "FINISHED",
                difficulty: 0,
                date: 0,
                context: "GAME FINISHED",
                link: "GAME FINISHED"
            });
            model_setCorrectParty("FINISHED");
        } else {
            let newExpressionArray = new Array(Math.max(expressionArray.length - 1, 0)); // create Array with size at least 0 or larger

            for (let index = 0; index < newExpressionArray.length; index++) {
                newExpressionArray[index] = expressionArray[index];
            }

            model_setRoundInformation(lastElement);
            model_setCorrectParty(lastElement.party);
            model_setExpressionArray(newExpressionArray);
        }
    }
}