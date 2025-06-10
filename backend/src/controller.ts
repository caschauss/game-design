import expressionData from './expressions.json';
import { model_setExpressionArray } from './model';

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
    let newExpressionArray:ExpressionData[] = [];
    expressionData.forEach(expressionData => {
        newExpressionArray.push(expressionData);
    })

    // Shuffle Array Content
    for (let i = newExpressionArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newExpressionArray[i], newExpressionArray[j]] = [newExpressionArray[j], newExpressionArray[i]];
    }
    
    model_setExpressionArray(newExpressionArray);
}