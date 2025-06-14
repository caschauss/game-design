import { Request, Response } from 'express';
import { controller_newRound } from './controller';
import { model_getCurrentScore } from './model';
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

// Getting current color
export const getColor = (model_setSelectedColor: () => string) => {
    return (req: Request, res: Response) => {
        let datetime = new Date();
        console.log("Received color request at " + datetime);
        res.json({ "color": model_setSelectedColor() });
    };
};

// Setting current color
export const setColor = (model_setSelectedColor: (color: string) => void) => {
    return (req: Request, res: Response) => {
        let datetime = new Date();
        model_setSelectedColor(req.body.color);
        console.log("Received colour modification at " + datetime + " to color: " + req.body.color);
        res.json({ "message": "ok" });
    };
};

// Getting current round information
export const getCurrentRoundInformation = (model_getRoundInformation: () => ExpressionData) => {
    return (req: Request, res: Response) => {
        let datetime = new Date();
        console.log("Received round information request at " + datetime);
        let info: ExpressionData = model_getRoundInformation();
        // info.party = "PLACEHOLDER"; // remove party information before sending
        res.json({ "roundInformation": info });
    };
};

// Calling a new round
export const callNewRound = () => {
    return (req: Request, res: Response) => {
        let datetime = new Date();
        controller_newRound();
        console.log("Received new round call at " + datetime);
        res.json({ "message": "ok" });
    };
}

// Reading current score
export const getCurrentScore = () => {
    return (req: Request, res: Response) => {
        let datetime = new Date();
        let score: number = model_getCurrentScore();
        console.log("Received score request at " + datetime);
        res.json({ "score": score });
    };
}

// API test route
export const testApi = () => {
    return (req: Request, res: Response) => {
        let datetime = new Date();
        console.log("Received API Test at " + datetime);
        res.json({ "message": "test" });
    }
}