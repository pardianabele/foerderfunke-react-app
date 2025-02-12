import React from 'react';
import { Grid, Typography } from '@mui/material';
import { HBox, VBox } from '../../../shared-components/LayoutBoxes';
import ContentBox from "../../../shared-components/ContentBox";
import useTranslation from "../../../language/useTranslation";
import theme from '../../../../theme';
import { Circle } from "@mui/icons-material";

const EligibilityOverviewLegend = () => {
    const { t } = useTranslation();

    return (
        <ContentBox sx={{ backgroundColor: theme.palette.primary.light }}>
            <VBox sx={{ gap: 2 }}>
                <Typography variant="body1">
                    {t('app.browseAll.legend.title')}
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4} container alignItems="center">
                        <HBox sx={{
                            alignItems: "center",
                            gap: theme.spacing(2),
                            padding: theme.spacing(1),
                            borderRadius: theme.shape.borderRadius,
                        }}>
                            <Circle sx={{ color: theme.palette.secondary.main }} />
                            <Typography variant="body2">
                                {t('app.browseAll.legend.probableEligible')}
                            </Typography>
                        </HBox>
                    </Grid>
                    <Grid item xs={12} sm={4} container alignItems="center">
                        <HBox sx={{
                            alignItems: "center",
                            gap: theme.spacing(2),
                            padding: theme.spacing(1),
                            borderRadius: theme.shape.borderRadius,
                        }}>
                            <Circle sx={{ color: theme.palette.error.main }} />
                            <Typography variant="body2">
                                {t('app.browseAll.legend.probableNotEligible')}
                            </Typography>
                        </HBox>
                    </Grid>
                    <Grid item xs={12} sm={4} container alignItems="center">
                        <HBox sx={{
                            alignItems: "center",
                            gap: theme.spacing(2),
                            padding: theme.spacing(1),
                            borderRadius: theme.shape.borderRadius,
                        }}>
                            <Circle sx={{ color: theme.palette.custom.lightGrey }} />
                            <Typography variant="body2">
                                {t('app.browseAll.legend.notEnoughData')}
                            </Typography>
                        </HBox>
                    </Grid>
                </Grid>
            </VBox>
        </ContentBox>
    );
};

export default EligibilityOverviewLegend;
