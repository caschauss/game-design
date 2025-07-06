import sqlite3 from 'sqlite3';
import { model_getDifficulty, model_getExpressionArray, model_getLastIndex, model_setCorrectParty, model_setExpressionArray, model_setLastIndex, model_setRoundInformation } from './model';

interface ExpressionData {
    expression: string;
    name: string;
    party: string;
    difficulty: number;
    date: number;
    context?: string;
    link: string;
}

const getExpressionsFromDB = (callback: (expressions: ExpressionData[]) => void) => {
    const db = new sqlite3.Database('./src/data.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error('Error opening db:', err.message);
            callback([]);
        }
    });

    const sql = 'SELECT expression, name, party, difficulty, date, link, context FROM expressions';

    db.all(sql, [], (err, rows: ExpressionData[]) => {
        if (err) {
            console.error('Error reading data:', err.message);
            callback([]);
        } else {
            const expressions: ExpressionData[] = rows.map(row => ({
                expression: row.expression,
                name: row.name,
                party: row.party,
                difficulty: row.difficulty,
                date: row.date,
                context: row.context,
                link: row.link
            }));
            callback(expressions);
        }
    });

    db.close();
};

export const controller_readExpressions = () => {
    getExpressionsFromDB((newExpressionArray) => {
        // Shuffle Array Content
        for (let i = newExpressionArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newExpressionArray[i], newExpressionArray[j]] = [newExpressionArray[j], newExpressionArray[i]];
        }

        model_setExpressionArray(newExpressionArray);
    });
}

export const controller_newRound = () => {
    let expressionArray: ExpressionData[] = model_getExpressionArray();
    let requestedDifficulty = model_getDifficulty();

    // Fallback Expression in case Array is empty (game finished) or if none of matching difficulty can be found
    let expression: ExpressionData = { expression: "GAME FINISHED", name: "GAME FINISHED", party: "FINISHED", difficulty: 0, date: 0, context: "GAME FINISHED", link: "GAME FINISHED" };
    // Fallback for empty Array
    if (expressionArray.length === 0) {
        model_setRoundInformation(expression);
    }

    // Searching for matching difficulty
    for (let index: number = model_getLastIndex(); index < expressionArray.length; index++) {
        console.log("Checking index = " + index + " with data: " + expressionArray[index]);
        if (expressionArray[index].difficulty === requestedDifficulty) {
            expression = expressionArray[index]; // take the first matching expression
            model_setLastIndex(index + 1);
            index = expressionArray.length; // terminate loop
        }
    }

    model_setRoundInformation(expression);
    model_setCorrectParty(expression.party)
}