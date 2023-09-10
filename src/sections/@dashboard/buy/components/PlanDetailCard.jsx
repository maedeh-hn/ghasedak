import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import {Box, useTheme} from '@mui/material';
import {useState} from 'react';
import BuyPlanModal from '../../../../components/modal/BuyPlanModal';
import TableToolbarActionButton from '../../../../components/table/TableToolbarActionButton';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import {numberWithCommas} from "src/utils/functions";
import CustomCard from "../../../../components/CustomCard";


export function PlanDetailCard({item}) {
    const theme = useTheme();
    const [selectPlan, setSelectPlan] = useState({
        open: false,
        data: null,
    });
    return (
        <>
            <CustomCard sx={{width: {md: 450, xs: 300}, mb: {md: 2, xs: 5}}}>
                <CardContent>
                    <Box sx={{display: 'flex', justifyContent: 'center', mb: 2}}>
                        <Typography sx={{fontSize: 22}} variant="body2" color="text.secondary">
                            {item.name}
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', mb: 1}}>
                        <StarRoundedIcon sx={{fontSize: 50, color: theme.palette.primary.main}}/>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', mb: 5}}>
                        <Typography sx={{fontSize: 34}} variant="body2" color="text.secondary">
                            {
                                item.price > 0 ? `${numberWithCommas(item.price)} ریال` : 'رایگان'
                            }
                        </Typography>
                    </Box>

                    {item?.priceRates?.map((item) =>
                        <>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap'}}>
                                <Typography variant="body2" color="text.secondary">
                                    {item.providerDescription}
                                </Typography>
                                <Typography sx={{color: theme.palette.primary.main}} fontWeight="bold" variant="body2">
                                    {numberWithCommas(item.faPrice)} ریال
                                </Typography>
                            </Box>
                        </>
                    )}
                </CardContent>
                <Box sx={{display: 'flex', justifyContent: 'right'}}>
                    <CardActions disableSpacing>
                        <TableToolbarActionButton
                            tooltip={'خرید'}
                            title={'خرید'}
                            onClick={() =>
                                setSelectPlan({
                                    open: true,
                                    data: item,
                                })
                            }
                        >
                            خرید
                        </TableToolbarActionButton>
                    </CardActions>
                </Box>
            </CustomCard>
            <BuyPlanModal state={selectPlan} setState={setSelectPlan}/>
        </>
    );
}
