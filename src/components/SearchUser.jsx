import PropTypes from 'prop-types';
// @mui
import {CircularProgress, Stack, TextField} from '@mui/material';
import {Autocomplete} from "@mui/lab";
import TuneIcon from "@mui/icons-material/Tune";
// import {lineUserSearch} from "src/services/lines/user";
import {useEffect, useState} from "react";
import SearchUserModal from './modal/SearchUserModal';
import { lineUserSearch } from '../services/lines/user';
// import SearchUserModal from "./modal/SearchUserModal";
// type

// ----------------------------------------------------------------------

SearchUser.propTypes = {
    name: PropTypes.string,
};

export function SearchUser({setFilterValue}) {
    const [userSearchModal, setUserSearchModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [options, setOptions] = useState([]);
    const loading = open && search.length >= 3;

    useEffect(() => {
        let active = true;

        (async () => {
            setOptions([])
            if (search.length >= 3) {
                const data = await lineUserSearch(search);
                if (active && data.isSuccess) {
                    setOptions(data.data);
                }
            }
        })();
        return () => {
            active = false;
        };
    }, [search]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <>
            <Autocomplete
                sx={{width: 300}}
                noOptionsText={search.length <= 2 ? 'جستجو کنید...' : 'کاربری یافت نشد'}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option.title === value.title}
                getOptionLabel={(option) => option.userName}
                onChange={(event, value) => {
                    setFilterValue((perv) => ({...perv, UserId: value?.id ?? ''}));
                }}
                options={options}
                size={'small'}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="جستجوی کاربر"
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <Stack paddingRight={3} direction={'row'} alignItems={'center'}>
                                    {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                    <TuneIcon cursor={'pointer'} onClick={() => setUserSearchModal(true)}/>
                                    {params.InputProps.endAdornment}
                                </Stack>
                            ),
                        }}
                    />
                )}
            />
            {userSearchModal && (
                <SearchUserModal open={userSearchModal} setOpen={setUserSearchModal} setFilter={setFilterValue}/>
            )}
        </>
    );
}
