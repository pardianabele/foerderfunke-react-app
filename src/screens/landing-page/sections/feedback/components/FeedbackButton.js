import React from "react";
import {Button, Typography} from "@mui/material";
import globalStyles from "../../../../../styles/styles";
import VStack from "../../../../../components/VStack";
import HStack from "../../../../../components/HStack";

const FeedbackButton = ({Icon, selected, handleButtonClick, color, label, isDesktop}) => {

    const DynamicStacker = ({children}) => {
        if (isDesktop) {
            return (
                <VStack alignItems={'center'} gap={1}>
                    {children}
                </VStack>
            );
        }
        return (
            <HStack gap={3} alignItems={'center'}>
                {children}
            </HStack>
        );
    };

    return (
        <DynamicStacker>
            <Button
                onClick={handleButtonClick}
                sx={{
                    fontSize: '30px',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    minWidth: '60px',
                    padding: 0,
                    backgroundColor: selected ? color : globalStyles.primaryColorTransparent,
                    border: selected ? `2px solid ${color}` : '2px solid transparent',
                    color: selected ? 'white' : 'black',
                    transition: 'background-color 0.3s, border 0.3s, color 0.3s',
                }}
            >
                <Icon style={{
                    fontSize: '50px',
                    color: selected ? 'white' : color,
                    transition: 'background-color 0.3s, border 0.3s, color 0.3s',
                }}/>
            </Button>
            <Typography sx={{color: color, fontWeight: 'bold'}}>
                {label}
            </Typography>
        </DynamicStacker>
    );
};

export default FeedbackButton;
