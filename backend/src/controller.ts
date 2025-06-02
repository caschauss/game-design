import expressionData from './expressions.json';

export const controller_readExpressions = () => {
    expressionData.forEach(expressionData => {
        console.log("Expression: " + expressionData.expression + " from " + expressionData.name);
    })
}