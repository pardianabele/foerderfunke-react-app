import React from 'react';
import {AppBar, Toolbar, IconButton, Typography} from '@mui/material';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {useNavigate} from 'react-router-dom';
//import {useStore} from './ViewportUpdater';
import HStack from "./HStack";
import VStack from "./VStack";

const Layout = ({children, logo = true, back = null}) => {
    const navigate = useNavigate();
    //const isDesktop = useStore((state) => state.isDesktop);
    const quickCheckImage = `${process.env.PUBLIC_URL}/assets/images/logo.svg`;

    return (
        <VStack
            data-testid={'layout-container'}
        >
            <AppBar position="static" sx={styles.navbarStyle}>
                {logo ? (
                    <HStack alignItems={'center'} sx={{padding: '0px'}}>
                        <img src={quickCheckImage} alt="logo" style={{height: '40px'}}/>
                        <Typography sx={styles.logoText}>
                            FörderFunke
                        </Typography>
                    </HStack>
                ) : null
                }
                {back ? (
                        <Toolbar sx={{padding: '0px'}}>
                            <IconButton edge="start" color="inherit" aria-label="back" onClick={() => navigate(-1)}>
                                <ArrowBackIosNewOutlinedIcon/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                {back}
                            </Typography>
                        </Toolbar>
                    )
                    : null}
            </AppBar>
            <VStack sx={styles.contentContainerStyle} data-testid="main-parent container">
                {children}
            </VStack>
        </VStack>
    )
};

const styles = {
    layoutContainerStyle: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflow: 'hidden',
    },
    navbarStyle: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        boxShadow: 'none',
        color: 'black',
        height: '10vh',
        paddingLeft: '16px',
    },
    contentContainerStyle: {
        width: '100%',
    },
    logoText: {
        fontSize: '20px',
        fontWeight: 'bold',
    }
}

export default Layout;
