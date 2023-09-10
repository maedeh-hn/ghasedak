import React from 'react';
import {
    Box,
    Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useTheme
} from '@mui/material';
import Scrollbar from '../../../../components/Scrollbar';
import {TableHeadCustom, TableNoData} from '../../../../components/table';
import TableLoading from '../../../../components/table/TableLoading';
import BuyPlanTableRow from './BuyPlanTableRow';
import TableToolbarActionButton from '../../../../components/table/TableToolbarActionButton';
import BuyPlanModal from '../../../../components/modal/BuyPlanModal';
import {numberWithCommas} from 'src/utils/functions';
import useTableData from "../../../../hooks/useTableData";
import useModal from "../../../../hooks/useModal";
import CustomCard from "../../../../components/CustomCard";
import Typography from "../../../../theme/overrides/Typography";
import Stack from "../../../../theme/overrides/Stack";
import useAuth from "../../../../hooks/useAuth.jsx";

const TABLE_HEAD = [
    {id: 'title', label: ''},
    {
        id: 'free',
        label: ' سرویس رایگان',
    },
    {
        id: 'silver',
        label: (
            <Box fontWeight="900" sx={{fontSize: 24}}>
                سرویس نقره ای
            </Box>
        ),
    },
    {id: 'gold', label: 'سرویس طلایی'},
];

const BuyPlanTable = ({data, isLoading, priceData}) => {
    const theme = useTheme();
    const [tableData, setTableData] = useTableData(data);

    const {user} = useAuth()

    const {
        isOpen: isPlanOpen,
        openModal: openPlanModal,
        closeModal: closePlanModal,
        modalData: planModalData
    } = useModal();

    return (
        <Box>
            <CustomCard>
                <Scrollbar>
                    <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                        <Table>
                            <TableBody>
                                {isLoading && <TableLoading count={TABLE_HEAD.length} rows={5}/>}
                                {!isLoading && tableData?.length === 0 &&
                                    <TableNoData isNotFound={tableData?.length === 0} count={TABLE_HEAD.length}/>}
                                {!isLoading &&
                                    <>
                                        <TableRow sx={{textAlign: 'center !important'}} hover>
                                            <TableCell align="left"></TableCell>
                                            <TableCell sx={{
                                                fontSize: 22,
                                                color: theme.palette.primary.main,
                                                borderRight: '1px solid #f1f3f4',
                                                borderLeft: '1px solid #f1f3f4',
                                                textAlign: 'center !important'
                                            }}
                                                       align="left">
                                                {/*{numberWithCommas(priceData[0]?.price) + 'ریال'}*/}
                                                <Box sx={{
                                                    flexDirection: 'column',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Box sx={{color: 'black',fontWeight:'bold'}}>
                                                        {'سرویس رایگان'}
                                                    </Box>
                                                    <Box sx={{mt: 2}}>
                                                        {user.planId === priceData[0].id ?
                                                            <Button fullWidth variant={'contained'} color={'grey'}>
                                                                فعال
                                                            </Button> : <Button sx={{height:'40px',width:'180px'}} fullWidth disabled variant={'contained'}
                                                                                color={'primary'}
                                                                                onClick={() => openPlanModal([priceData[1]])}>
                                                                خرید
                                                            </Button>
                                                        }
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{
                                                fontSize: 22,
                                                color: theme.palette.primary.main,
                                                borderRight: '1px solid #f1f3f4',
                                                textAlign: 'center !important'
                                            }}
                                                       align="center">
                                                <Box sx={{
                                                    flexDirection: 'column',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Box sx={{color: theme.palette.primary.main,fontWeight:'bold'}}>
                                                        {'سرویس نقره ای'}
                                                    </Box>

                                                    <Box sx={{mt: 2}}>
                                                        {
                                                            user.planId === priceData[1].id ?
                                                                <Button sx={{height:'40px',width:'180px'}} fullWidth variant={'outlined'} color={'primary'}>
                                                                    فعال
                                                                </Button> : <Button fullWidth sx={{height:'40px',width:'180px'}}  variant={'contained'}
                                                                                    color={'primary'}
                                                                                    onClick={() => openPlanModal([priceData[1]])}>
                                                                    خرید
                                                                </Button>
                                                        }

                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{
                                                fontSize: 22,
                                                color: theme.palette.primary.main,
                                                textAlign: 'center !important'
                                            }}
                                                       align="left">
                                                {/*{numberWithCommas(priceData[2]?.price) + 'ریال'}*/}
                                                <Box sx={{
                                                    flexDirection: 'column',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Box sx={{color: theme.palette.secondary.main,fontWeight:'bold'}}>
                                                        سرویس طلایی
                                                    </Box>
                                                    <Box sx={{mt: 2}}>
                                                        {
                                                            user.planId === priceData[2].id ?
                                                                <Button fullWidth sx={{height:'40px',width:'180px'}}  variant={'contained'} color={'grey'}>
                                                                    فعال
                                                                </Button> : <Button sx={{height:'40px',width:'180px'}} fullWidth variant={'contained'}
                                                                                    color={'secondary'}
                                                                                    onClick={() => openPlanModal([priceData[2]])}>
                                                                    خرید
                                                                </Button>
                                                        }

                                                    </Box>
                                                </Box>


                                            </TableCell>
                                        </TableRow>
                                        {tableData?.map((row, index) => (
                                            // <BuyPlanTableRow
                                            //     key={index}
                                            //     row={row}
                                            // />
                                            <TableRow hover>
                                                <TableCell sx={{borderRight: '1px solid #f1f3f4', borderBottom: 'none',fontSize:'16px'}}
                                                           align="left">{row.title}</TableCell>
                                                {row.prices.map((price, index) => (
                                                    <TableCell sx={{
                                                        textAlign: `${index == -1 ? "left" : "center"}`,
                                                        borderRight: `${index == 2 ? '0' : '1px'} solid #f1f3f4`,
                                                        borderBottom: 'none',
                                                        fontSize: index === 1 ? 22 : 16
                                                    }} key={index} align="left">
                                                        {numberWithCommas(price)} ریال

                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
            </CustomCard>
            {isPlanOpen && <BuyPlanModal state={isPlanOpen} handleClose={closePlanModal} data={planModalData}/>}
        </Box>
    );
};

export default BuyPlanTable;
