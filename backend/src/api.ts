import { Request, Response } from 'express';

interface RoundInformation {
  expression: string;
  name: string;
  party: string;
  difficulty: number;
  date: string;
  context: string;
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
export const getCurrentRoundInformation = (model_getRoundInformation: () => RoundInformation) => {
    return (req: Request, res: Response) => {
        let datetime = new Date();
        console.log("Received round information request at " + datetime);
        res.json({ "roundInformation": model_getRoundInformation() });
    };
};

// API test route
export const testApi = () => {
    return (req: Request, res: Response) => {
        let datetime = new Date();
        console.log("Received API Test at " + datetime);
        res.json({ "message": "test" });
    }
}