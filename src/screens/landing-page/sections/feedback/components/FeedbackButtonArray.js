import React, { useState } from "react";
import FeedbackButton from "./FeedbackButton";
import HStack from "../../../../../components/HStack";
import VStack from "../../../../../components/VStack";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

// Array of icon components with corresponding sentiment colors
const icons = [
    { Icon: SentimentVeryDissatisfiedIcon, color: '#f44336' },  // Red
    { Icon: SentimentDissatisfiedIcon, color: '#ff9800' },      // Orange
    { Icon: SentimentNeutralIcon, color: '#9e9e9e' },           // Grey
    { Icon: SentimentSatisfiedIcon, color: '#8bc34a' },         // Light green
    { Icon: SentimentVerySatisfiedIcon, color: '#4caf50' },     // Green
];

const FeedbackButtonArray = ({ isDesktop }) => {
    const [selected, setSelected] = useState(null);

    const handleButtonClick = (index) => {
        setSelected((prevSelected) => prevSelected === index ? null : index);
    };

    const DynamicStacker = ({ children }) => {
        if (isDesktop) {
            return (
                <HStack
                    gap={3}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    sx={{ width: "100%" }}  // Correctly place sx prop here
                >
                    {children}
                </HStack>
            );
        }
        return (
            <VStack
                alignItems={'center'}
                sx={{ width: "100%" }}  // Correctly place sx prop here
            >
                {children}
            </VStack>
        );
    };

    return (
        <DynamicStacker>
            {
                icons.map((item, index) => (
                    <FeedbackButton
                        key={index}
                        Icon={item.Icon}
                        color={item.color}   // Pass the color prop to FeedbackButton
                        selected={selected === index}
                        handleButtonClick={() => handleButtonClick(index)}
                    />
                ))
            }
        </DynamicStacker>
    );
}

export default FeedbackButtonArray;
