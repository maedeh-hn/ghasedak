import {
    Button,
    Stack,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React, {useEffect} from 'react';
import {useMutation} from "@tanstack/react-query";
import BaseStyleScrollModal from './BaseStyleScrollModal';
import Scrollbar from '../Scrollbar';
import TableLoading from '../table/TableLoading';
import { TableNoData } from '../table';
import { searchUserById } from '../../services/users/user';
// import {searchUserById} from "src/services/users/user";
// import BaseStyleScrollModal from './BaseStyleScrollModal';
// import Scrollbar from '../Scrollbar';
// import TableLoading from "../table/TableLoading";
// import {TableNoData} from "../table";

const UserInfoModal = ({state, setState,userId}) => {
    const searchUser = useMutation({
        mutationFn: (userId) => searchUserById(userId),
    })
    useEffect(()=> {
        searchUser.mutate(state.data)
    }, [])
    // const {isLoading, data, refetch} = useQuery(['userLineDetailParent', userId], () => searchUserById(userId));

    return (
        <BaseStyleScrollModal
            show={state.open}
            handleClose={() => setState({
                open: false,
                data: null
            })}
            title={'کاربر'}
            mdWidth={300}
            lgWidth={400}
        >
            <Scrollbar>
                <TableContainer>
                    <Table>
                        <TableHead
                            sx={{
                                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                '& th': {backgroundColor: 'transparent'},
                            }}
                        >
                            <TableRow>
                                <TableCell align="left">#</TableCell>
                                <TableCell align="left">نام</TableCell>
                                <TableCell align="left">موبایل</TableCell>
                                <TableCell align="left">نام کاربری</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {searchUser.isLoading && <TableLoading count={4}/>}
                            {!searchUser.isLoading && <TableNoData count={4} isNotFound={searchUser?.data?.items.length === 0}/>}
                            {searchUser.data && searchUser.data?.items.map((user, index) => <TableRow>
                                    <TableCell align="left">{index +1}</TableCell>
                                    <TableCell align="left">{user.fullName}</TableCell>
                                    <TableCell align="left">{user.mobile}</TableCell>
                                    <TableCell align="left">{user.userName}</TableCell>
                                </TableRow>) }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Scrollbar>
            <Stack sx={{mt: 6}} flexDirection={'row'} justifyContent={'flex-end'}>
                <Button
                    onClick={() => setState({
                        open: false, data: null
                    })}
                    sx={{minHeight: 36, maxHeight: 36, minWidth: 84}}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    بستن
                </Button>
            </Stack>
        </BaseStyleScrollModal>
    );
};

export default UserInfoModal;
