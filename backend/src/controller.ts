import sqlite3 from 'sqlite3';
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

// Funktion zum Abrufen der Ausdrücke aus der Datenbank
const getExpressionsFromDB = (callback: (expressions: ExpressionData[]) => void) => {
    const db = new sqlite3.Database('./src/data.db', sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error('Fehler beim Öffnen der Datenbank:', err.message);
            callback([]);
        }
    });

    const sql = 'SELECT expression, name, party, difficulty, date, link, context FROM expressions';

    db.all(sql, [], (err, rows: ExpressionData[]) => { // Typ für rows definiert
        if (err) {
            console.error('Fehler beim Abrufen der Daten:', err.message);
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

// Liest und mischt die Ausdrücke aus der Datenbank
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