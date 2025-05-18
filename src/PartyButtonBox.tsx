import React, { useState } from 'react';
import { Button } from "@mantine/core";
import expressions from './expressions.json'

interface PartyButtonBoxProps {
    handleButtonClick: () => void;
    setExpression: (expression: string) => void;
}

export const PartyButtonBox: React.FC<PartyButtonBoxProps> = ({ handleButtonClick, setExpression }) => {
    const [expressionID, setExpressionID] = useState(0);

    const getNewExpression = () => {
        console.log(JSON.stringify(expressions[expressionID]));
        setExpression(expressions[expressionID].expression);
        setExpressionID(expressionID + 1);
    }

    return (
        <div style={{ width: "100%", height: "50vh" }}>
            <Button style={{ width: "50%", height: "25vh", backgroundColor: "blue" }} onClick={handleButtonClick}>Option A</Button>
            <Button style={{ width: "50%", height: "25vh", backgroundColor: "green" }} onClick={handleButtonClick}>Option B</Button>
            <Button style={{ width: "50%", height: "25vh", backgroundColor: "yellow" }} onClick={handleButtonClick}>Option C</Button>
            <Button style={{ width: "50%", height: "25vh", backgroundColor: "pink" }} onClick={handleButtonClick}>Option D</Button>
            <button onClick={getNewExpression}>print</button>
        </div>
    );
}