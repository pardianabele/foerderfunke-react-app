import React, {useEffect, useState} from 'react';
import {Button, Typography} from '@mui/material';
import {useSelectedTopicsStore} from "../../storage/zustand";
import OnboardingWelcomeScreen from "./components/OnboardingWelcomeScreen";
import VStack from "../../components/VStack";
import globalStyles from "../../styles/styles";
import readJson from "../../utilities/readJson";

const OnboardingWelcomeTopics = () => {
    const [topicsData, setTopicsData] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const selectedTopicsStore = useSelectedTopicsStore((state) => state.selectedTopics);
    const addSelectedTopic = useSelectedTopicsStore((state) => state.addSelectedTopic);
    const removeSelectedTopic = useSelectedTopicsStore((state) => state.removeSelectedTopic);

    useEffect(() => {
        const fetchData = async () => {
            const filePath = `assets/data/topics/topics-list.json`
            try {
                const newTopicsData = await readJson(filePath);
                setTopicsData(newTopicsData);
            } catch (error) {
                console.error('Failed to fetch profile input screen data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const newSelectedTopics = new Array(topicsData.length).fill(false);
        selectedTopicsStore.forEach((selectedTopic) => {
            const index = topicsData.findIndex((topic) => topic.id === selectedTopic);
            if (index !== -1) {
                newSelectedTopics[index] = true;
            }
        });
        setSelectedTopics(newSelectedTopics);
    }, [selectedTopicsStore, topicsData]);

    const handleButtonClick = (index) => {
        const newSelectedTopics = [...selectedTopics];
        newSelectedTopics[index] = !newSelectedTopics[index];
        setSelectedTopics(newSelectedTopics);
        if (newSelectedTopics[index]) {
            addSelectedTopic(topicsData[index].id);
        } else {
            removeSelectedTopic(topicsData[index].id);
        }
    };

    console.log('selected Topics', selectedTopicsStore);

    return (
        <OnboardingWelcomeScreen buttonText={'Confirm'} link={`/onboarding-welcome`}>
            <Typography variant="body1" gutterBottom sx={styles.titleText}>
                Which topic/s are you interested in exploring benefits for?
            </Typography>
            <VStack alignItems={'center'}>
                {topicsData.map((topic, index) => (
                    <Button
                        key={index}
                        onClick={() => handleButtonClick(index)}
                        sx={{
                            ...styles.topicItemButton,
                            backgroundColor: selectedTopics[index] ? globalStyles.primaryColor : globalStyles.colorDarkGreyTransparent,
                            '&:hover': {
                                backgroundColor: selectedTopics[index] ? globalStyles.primaryColor : globalStyles.colorDarkGreyTransparent,
                            },
                            '&:active': {
                                backgroundColor: selectedTopics[index] ? globalStyles.primaryColor : globalStyles.colorDarkGreyTransparent,
                            },
                            '&:focus': {
                                backgroundColor: selectedTopics[index] ? globalStyles.primaryColor : globalStyles.colorDarkGreyTransparent,
                            },
                        }}>
                        <Typography sx={styles.topicText}>
                            {topic.title}
                        </Typography>
                    </Button>))}
            </VStack>
        </OnboardingWelcomeScreen>
    );
}

const styles = {
    titleText: {
        fontSize: '28px',
        fontWeight: 'bold'
    },
    topicItemButton: {
        width: '100%',
        borderRadius: '12px',
        padding: '8px',
        '&:hover': {
            backgroundColor: 'inherit',
        },
        '&:active': {
            backgroundColor: 'inherit',
        },
        '&:focus': {
            backgroundColor: 'inherit',
        },
    },
    topicText: {
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'left',
        textTransform: 'none',
        color: 'black',
    }
};

export default OnboardingWelcomeTopics;
