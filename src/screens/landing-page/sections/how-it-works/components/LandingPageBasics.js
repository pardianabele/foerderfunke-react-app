import VStack from "../../../../../components/VStack";
import HStack from "../../../../../components/HStack";
import {Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {green} from "@mui/material/colors";
import globalStyles from "../../../../../styles/styles";

const LandingPageBasics = () => {
    return (
        <VStack alignItems={'center'} sx={{width: "100%"}}>
            <VStack
                alignItems={'center'}
                sx={{
                    backgroundColor: globalStyles.primaryColor,
                    padding: '32px',
                    borderRadius: '15px',
                }}>
                <HStack>
                    <Typography sx={styles.titleText}>
                        The basics
                    </Typography>
                </HStack>
                <VStack>
                    <HStack alignItems={'center'}>
                        <CheckCircleIcon sx={styles.icon}/>
                        <Typography sx={styles.itemText}>
                            FörderFunke is <strong>free to use</strong>
                        </Typography>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <CheckCircleIcon sx={styles.icon}/>
                        <Typography sx={styles.itemText}>
                            <strong>Your data is yours!</strong> All the information you fill in is stored only
                            locally on your device
                        </Typography>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <CheckCircleIcon sx={styles.icon}/>
                        <Typography sx={styles.itemText}>
                            <strong>No registration</strong>, no login needed
                        </Typography>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <CheckCircleIcon sx={styles.icon}/>
                        <Typography sx={styles.itemText}>
                            You can use it on the <strong>phone or laptop</strong>
                        </Typography>
                    </HStack>
                </VStack>
            </VStack>
        </VStack>
    );
}

const styles = {
    titleText: {
        fontWeight: 'bold',
        fontSize: '28px'
    },
    icon: {
        color: green[500],
        fontSize: '34px',
    },
    itemText: {
        fontSize: '20px'
    }
}

export default LandingPageBasics;
