import { Button } from "@mantine/core";

interface PartyButtonBoxProps {
    handleButtonClick: () => void;
}

export const PartyButtonBox: React.FC<PartyButtonBoxProps> = ({handleButtonClick}) => {
    return (
        <div style={{ width: "100%", height: "50vh"}}>
            <Button style={{ width: "50%", height: "25vh", backgroundColor: "blue" }} onClick={handleButtonClick}>Option A</Button>
            <Button style={{ width: "50%", height: "25vh", backgroundColor: "green" }} onClick={handleButtonClick}>Option B</Button>
            <Button style={{ width: "50%", height: "25vh", backgroundColor: "yellow" }} onClick={handleButtonClick}>Option C</Button>
            <Button style={{ width: "50%", height: "25vh", backgroundColor: "pink" }} onClick={handleButtonClick}>Option D</Button>
        </div>
    );
}