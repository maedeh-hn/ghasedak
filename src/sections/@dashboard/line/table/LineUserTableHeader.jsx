import { Stack, Button, Typography, Tooltip } from '@mui/material';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useState } from 'react';
import AddLineUserModal from '../components/modal/AddLineUserModal';
import { useParams } from 'react-router';
// import AddLineUserModal from '../../components/modal/AddLineUserModal';

const LineUserTableHeader = ({refetch, totalCount}) => {
    const [openAddUser, setOpenAddUser] = useState(false);
const params=useParams()
console.log(params);
    return (
        <>
            <Stack
                spacing={2}
                mb={2}
                paddingX={1}
                direction={{xs: 'column', sm: 'row', md: 'row'}}
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: 1,
                }}
            >
                <Stack
                    direction="row"
                    alignItems={'center'}
                    sx={{
                        display: 'flex',
                        justifySelfstSelf: 'flex-start',
                        width: {xs: '100%', sm: '50%', md: '40%'},
                    }}
                >
                    {/* <Typography variant={'h4'} fontWeight={'bold'}>
                        خطوط برای  {params.username} 
                    </Typography> */}
                </Stack>
                <Stack direction="row" spacing={2} gap={1}>
                    <Tooltip
                        followCursor
                        title={'تخصیص خط جدید '}
                        placement="top"
                        arrow
                        sx={{
                            width: {xs: '100%', sm: '30%', md: 'auto'},
                        }}
                    >
                        <Button variant="outlined" color="primary" onClick={() => setOpenAddUser(true)}>
                            <Typography marginLeft={1}>
                            تخصیص خط جدید
                            </Typography>
                        </Button>
                    </Tooltip>
                </Stack>
            </Stack>
            {
                openAddUser && <AddLineUserModal state={openAddUser} setState={setOpenAddUser} refetch={refetch} userName={params.username}/>
            }
        </>
    );
}

export default LineUserTableHeader;