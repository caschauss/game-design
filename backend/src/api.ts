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
export const getColor = (handleGetColor: () => string) => {
    return (req: Request, res: Response) => {
        let datetime = new Date();
        console.log("Received color request at " + datetime);
        res.json({ "color": handleGetColor() });
    };
};

// Setting current color
export const setColor = (handleSetColor: (color: string) => void) => {
    return (req: Request, res: Response) => {
        let datetime = new Date();
        handleSetColor(req.body.color);  // Setzt die neue Farbe
        console.log("Received colour modification at " + datetime + " to color: " + req.body.color);
        res.json({ "message": "ok" });
    };
};

// Getting current round information
export const getCurrentRoundInformation = (handleGetCurrentRoundInformation: () => RoundInformation) => {
    return (req: Request, res: Response) => {
        let datetime = new Date();
        console.log("Received round information request at " + datetime);
        res.json({ "roundInformation": handleGetCurrentRoundInformation() });
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