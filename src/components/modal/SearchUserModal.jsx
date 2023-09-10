import {
    Box,
    Button,
    Card,
    Divider,
    Grid,
    Stack,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import React, {useState} from 'react';
import {LoadingButton} from '@mui/lab';
import {useForm} from 'react-hook-form';

import {useSnackbar} from 'notistack';
import {useTheme} from '@mui/material/styles';
import {useMutation} from "@tanstack/react-query";
import Scrollbar from '../Scrollbar';
import BaseStyleScrollModal from './BaseStyleScrollModal';
import { FormProvider, RHFTextField } from '../hook-form';
import TableLoading from '../table/TableLoading';
import { TableNoData } from '../table';
import { advanceLineUserSearch } from '../../services/users/user';
// import Scrollbar from '../Scrollbar';
// import BaseStyleScrollModal from './BaseStyleScrollModal';
// import {FormProvider, RHFTextField} from '../hook-form';
// import TableLoading from "../table/TableLoading";
// import {TableNoData} from "../table";

const SearchUserModal = ({open, setOpen, setFilter}) => {
    const {enqueueSnackbar} = useSnackbar();

    const searchUser = useMutation({
        mutationFn: values => advanceLineUserSearch(values),
        onSuccess: data => {
            if (data?.isSuccess) {
                setUserList(data?.data?.items);
               
            } else {
                enqueueSnackbar('خطا در اتصال', {variant: 'error'});
            }
        },
        onError: error => {
            enqueueSnackbar('خطا در اتصال', {variant: 'error'});
        },
    })

    const theme = useTheme();

    const methods = useForm({
        defaultValues: {
            UserId: '',
            UserName: '',
            FullName: '',
            Mobile: '',
        },
    });

    const [userList, setUserList] = useState([]);

    const {
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (values) => {
        searchUser.mutate(values)
    };
    return (
        <Box
            sx={{
                '& .Modal-root': {
                    display: 'flex !important',
                    borderRadius: '30px',
                },
            }}
        >
            <BaseStyleScrollModal show={open} handleClose={handleClose} title={'جستجوی کاربر'}>
                <Scrollbar
                    sx={{
                        maxHeight: 500,
                    }}
                >
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={1} padding={1}>
                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <RHFTextField size={'small'} name="UserId" label="ایدی کاربر"/>
                                    <RHFTextField size={'small'} name="UserName" label="نام کاربری"/>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Stack spacing={1}>
                                    <RHFTextField size={'small'} name="FullName" label="نام کامل"/>
                                    <RHFTextField size={'small'} name="Mobile" label="موبایل"/>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Stack flexDirection={'row'} justifyContent={'flex-end'}>
                                    <Button
                                        size="large"
                                        sx={{
                                            minHeight: 36,
                                            maxHeight: 36,
                                            minWidth: 84,
                                            color: theme.palette.text.disabled,
                                            borderColor: theme.palette.text.disabled,
                                            marginRight: 1,
                                            border: 'none',
                                            ':hover': {
                                                color: theme.palette.grey[100],
                                                backgroundColor: theme.palette.grey[700],
                                            },
                                        }}
                                        color={'inherit'}
                                        variant="outlined"
                                        onClick={() => {
                                            setFilter((perv) => ({...perv, UserId: '', usernameSelect: ''}));
                                            setOpen(false);
                                        }}
                                    >
                                        حذف
                                    </Button>
                                    <LoadingButton
                                        sx={{minHeight: 36, maxHeight: 36, minWidth: 84, color: 'white'}}
                                        type="submit"
                                        variant="contained"
                                        loading={searchUser.isLoading}
                                    >
                                        جستجو
                                    </LoadingButton>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Divider/>
                            </Grid>
                        </Grid>
                        <Scrollbar>
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{
                                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                        '& th': {backgroundColor: 'transparent'},
                                    }}>
                                        <TableRow>
                                            <TableCell sx={{padding: 1,}} align="left">#</TableCell>
                                            <TableCell sx={{padding: 1,}} align="left">نام</TableCell>
                                            <TableCell sx={{padding: 1,}} align="left">موبایل</TableCell>
                                            <TableCell sx={{padding: 1,}} align="left">نام کاربری</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {searchUser.isLoading && <TableLoading count={4}/>}
                                        {!searchUser.isLoading &&
                                            <TableNoData count={4} isNotFound={userList.length === 0}/>}
                                        {userList.map((item, index) => (
                                            <TableRow key={index} sx={{cursor: 'pointer',}} onClick={() => {
                                                setFilter((perv) => ({...perv, UserId: item.id}));
                                                setOpen(false);
                                            }}
                                            >
                                                <TableCell sx={{padding: 1,}} align="left">{index + 1}</TableCell>
                                                <TableCell sx={{padding: 1,}} align="left">{item?.fullName}</TableCell>
                                                <TableCell sx={{padding: 1,}}
                                                           align="left">{`${item?.mobile}`}</TableCell>
                                                <TableCell sx={{padding: 1,}}
                                                           align="left">{`${item?.userName}`}</TableCell>
                                            </TableRow>
                                        ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Scrollbar>
                    </FormProvider>
                </Scrollbar>
            </BaseStyleScrollModal>
        </Box>
    );
};

export default SearchUserModal;
