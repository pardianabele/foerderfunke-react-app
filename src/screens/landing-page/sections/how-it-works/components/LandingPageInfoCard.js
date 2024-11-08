import VStack from "../../../../../components/VStack";
import HStack from "../../../../../components/HStack";
import {Typography} from "@mui/material";
import globalStyles from "../../../../../styles/styles";

const LandingPageInfoCard = ({title, text, onMouseLeave, onMouseEnter, hovered}) => {
    return (
        <VStack gap={0}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                sx={{
                    maxWidth: '425px',
                    backgroundColor: hovered ? globalStyles.primaryColor : 'white',
                    borderRadius: '12px',
                    transition: 'background-color 0.2s',
                }}
        >
            <VStack gap={1} sx={styles.infoCard}>
                <HStack>
                    <Typography sx={styles.titleText}>
                        {title}
                    </Typography>
                </HStack>
                <HStack>
                    <Typography sx={styles.subTitleText}>
                        {text}
                    </Typography>
                </HStack>
            </VStack>
        </VStack>
    );
}

const styles = {
    infoCard: {
        borderRadius: '15px',
        padding: '16px',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: '24px',
    },
    subTitleText: {
        fontSize: '20px',
    }
};

export default LandingPageInfoCard;
