import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import {useQuery} from '@tanstack/react-query';
import {getGroupNumbersByGroupId} from 'src/services/contact/group-number';
import {useFieldArray, useFormContext, useWatch} from 'react-hook-form';
import Scrollbar from '../../../../../components/Scrollbar';
import TableLoading from '../../../../../components/table/TableLoading';
import {Pagination} from "@mui/lab";
import BaseStyleScrollModal from "../../../../../components/modal/BaseStyleScrollModal.jsx";

const SelectNumbersModal = ({state, setState}) => {
    const theme = useTheme();

    const {control, setValue, getValues} = useFormContext();

    const [numbers, setNumbers] = useState([]);

    const {append, remove} = useFieldArray({
        control,
        name: 'receptors',
    });

    const addLocalNumber = (groupId, receptor) => {
        setNumbers((prevState) => [
            ...prevState,
            {
                groupId: groupId,
                receptor: receptor,
            },
        ]);
    };

    const removeLocalNumber = (number) => {
        setNumbers((prevState) => prevState.filter((item) => item.receptor != number));
    };

    const receptors = useWatch({
        control,
        name: 'receptors',
    });

    useEffect(() => {
        setNumbers(receptors);
    }, []);

    const handleAdd = () => {
        let must_remove = [];
        let must_add = [];
        receptors.forEach((receptor, index) => {
            let in_numbers = numbers.some((num) => num.receptor == receptor.receptor);
            if (!in_numbers) {
                must_remove.push(index);
            }
        });

        remove(must_remove);
        numbers.forEach((num) => {
            let in_rec = receptors.some((receptor) => receptor.receptor == num.receptor);
            if (!in_rec) {
                must_add.push(num);
            }
        });
        append(must_add);
        if (numbers.length <= 0) {
            setValue('groupIds', [...getValues('groupIds')?.filter((num) => num != state.data)]);
        } else {
            setValue('groupIds', [...getValues('groupIds'), state.data]);
        }
        handleClose();
    };

    const [listData, setListData] = useState([]);

    const handleClose = () => {
        setState({
            open: false,
            data: null,
        });
    };
    const [filterValue, setFilterValue] = useState({
        groupId: state.data,
        PageIndex: 1,
        PageSize: 10,
    });

    const {isLoading, data} = useQuery(['GroupNumber', filterValue], () => getGroupNumbersByGroupId(filterValue));

    useEffect(() => {
        if (data) {
            setListData(data?.data?.items);
        }
    }, [data]);
    const handleSelectAll = (event) => {
        listData?.map((item) => {
            if (event.target.checked) {
                addLocalNumber(item.groupId, item.number);
            } else {
                removeLocalNumber(item.number);
            }
        });
    };
    return (
        <>
            <BaseStyleScrollModal
                show={state.open}
                handleClose={handleClose}
                title={`انتخاب مخاطبین(${data?.data?.totalCount ?? 0} مخاطب)`}
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
                                <TableRow
                                    sx={{'&:hover': {backgroundColor: `${theme.palette.primary.lighter} !important`}}}>
                                    <TableCell
                                        sx={{
                                            padding: 1,
                                        }}
                                    >
                                        <Checkbox onClick={handleSelectAll}/>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: 1,
                                        }}
                                        align="left"
                                    >
                                        شماره
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            padding: 1,
                                        }}
                                        align="left"
                                    >
                                        نام و نام خانوادگی
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {isLoading ? (
                                    <TableLoading rows={10} count={3}/>
                                ) : (
                                    listData?.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                                '&:hover': {backgroundColor: `${theme.palette.primary.lighter} !important`},
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                if (numbers.some((num) => num.receptor == item.number)) {
                                                    removeLocalNumber(item.number);
                                                } else {
                                                    addLocalNumber(item.groupId, item.number);
                                                }
                                            }}
                                        >
                                            <TableCell
                                                sx={{
                                                    padding: 'unset',
                                                }}
                                                align="left"
                                            >
                                                <Checkbox checked={numbers.some((num) => num.receptor == item.number)}/>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    padding: 'unset',
                                                }}
                                                align="left"
                                            >
                                                {item.number}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    padding: 'unset',
                                                }}
                                                align="left"
                                            >{`${item?.firstName ?? ''} ${item?.lastName ?? ''}`}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>
                <Stack marginTop={1}>
                    <Pagination
                        color="primary"
                        onChange={(event, page) => setFilterValue((prevState) => ({...prevState, PageIndex: page}))}
                        count={data?.data?.totalPages}
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
                <Stack flexDirection={'row'} justifyContent={'flex-end'} marginTop={1}>
                    <Button
                        size="large"
                        sx={{
                            minHeight: 36,
                            maxHeight: 36,
                            color: theme.palette.text.disabled,
                            marginRight: 1,
                            border: 'none',
                            ':hover': {
                                color: theme.palette.grey[100] + '!important',
                                backgroundColor: theme.palette.grey[700] + '!important',
                            },
                        }}
                        color={'inherit'}
                        variant="outlined"
                        onClick={handleClose}
                    >
                        انصراف
                    </Button>
                    <Button color={'primary'} variant="contained" onClick={handleAdd}>
                        انتخاب
                    </Button>
                </Stack>
            </BaseStyleScrollModal>
        </>
    );
};

export default React.memo(SelectNumbersModal);
