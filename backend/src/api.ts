import { Request, Response } from 'express';

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

// API test route
export const testApi = () => {
    return (req: Request, res: Response) => {
        let datetime = new Date();
        console.log("Received API Test at " + datetime);
        res.json({ "message": "test" });
    }
}