import Page from '../../../components/Page';
import { useParams } from 'react-router-dom';
import { Alert, Box, Card, LinearProgress, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { CheckInternalTransaction } from 'src/services/users/transaction';
import { useEffect } from 'react';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs.jsx';
import { PATH_DASHBOARD } from '../../../routes/paths.jsx';
import { fDateTimeJalali } from '../../../utils/formatTime.jsx';
import { numberWithCommas } from 'src/utils/functions';
import { RefreshTokenBuyModule } from '../../../services/users/transaction';
import { useTheme } from '@emotion/react';

const Order = () => {
  const params = useParams();
const theme=useTheme()
  const internalCheck = useMutation({
    mutationFn: (orderId) => CheckInternalTransaction(orderId),
  });
  const moduleBuyCheck = useMutation({
    mutationFn: () => RefreshTokenBuyModule(),
  });
  useEffect(() => {
    if (params.isModule === 'true' && params.orderId != 0) {
      moduleBuyCheck.mutate();
    }
    if (params.orderId != 0) {
      internalCheck.mutate(params.orderId);
    }
  }, []);

  useEffect(() => {
    if (params.isModule === 'true' && params.orderId != 0) {
      localStorage.setItem('accessToken', moduleBuyCheck?.data?.data?.access_token);
      localStorage.setItem('refreshToken', moduleBuyCheck?.data?.data?.refresh_token);
      localStorage.setItem('panelType', moduleBuyCheck?.data?.data?.panelType);
    }
  }, [moduleBuyCheck?.data?.data]);
  return (
    <Page title={'سفارش'}>
      <HeaderBreadcrumbs links={[{ name: 'داشبورد', href: PATH_DASHBOARD.root }, { name: 'سفارش' }]} />
      <Stack padding={5} >
          <Box >
        <Card  sx={{border:internalCheck.data?.data.isPaid ?`2px solid ${theme.palette.success.light} `:`2px solid ${theme.palette.warning.light}`}}>
          {internalCheck.isLoading ? (
            <LinearProgress />
          ) : (
            <>
              {params.orderId == '0' ? (
                <Alert severity={'warning'}>پرداخت شما ناموفق می باشد.</Alert>
              ) : (
                <>
                  {' '}
                  <Typography sx={{padding:"5px"}}>تاریخ درخواست : {fDateTimeJalali(internalCheck.data?.data.createdDate)}</Typography>
                  <Typography sx={{padding:"5px"}}>توضیحات : {internalCheck.data?.data.description}</Typography>
                  <Typography sx={{background:internalCheck.data?.data.isPaid ?theme.palette.success.lighter:theme.palette.warning.lighter,borderRadius:"10px",paddingX:"5px",paddingY:"5px"}}>
                    وضعیت پرداخت : {internalCheck.data?.data.isPaid ? 'پرداخت شده' : 'پرداخت نشده'}
                  </Typography>
                  <Typography sx={{padding:"5px"}}>قیمت : {numberWithCommas(internalCheck.data?.data.price)} ریال</Typography>
                </>
              )}
            </>
          )}
          
        </Card>
          </Box>
      </Stack>
    </Page>
  );
};

export default Order;
