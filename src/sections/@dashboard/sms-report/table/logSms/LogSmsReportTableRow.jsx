import React from 'react';
import {Box, Button, Collapse, Stack, TableCell, TableRow, Typography} from '@mui/material';
import {fDateTimeJalali} from '../../../../../utils/formatTime';
import {useState} from 'react';
import SmsModalTable from '../smsModalTable/SmsModalTable';
import Label from '../../../../../components/Label';
import {useTheme} from '@mui/material/styles';
import ReactJson from 'react-json-view'
import useSettings from "../../../../../hooks/useSettings.jsx";

const LogSmsReportTableRow = ({row}) => {
    const [show, setShow] = useState(false);
    const theme = useTheme();
    const {themeMode} = useSettings();
    return (
        <>
            <TableRow>
                <TableCell align="left">{fDateTimeJalali(row.createdDate)}</TableCell>
                <TableCell align="left">
                    <Label>
                        {row.method}
                    </Label>
                    {row.endpointName}
                </TableCell>
                <TableCell align="left">
                    <Label color={(row.statusCode === 200 ? 'success' : 'error') || 'default'}>{row.statusCode}</Label>
                </TableCell>
                <TableCell align="left">{row.ip}</TableCell>
                <TableCell align="center">
                    <Button onClick={() => setShow(!show)}>جزییات</Button>
                </TableCell>
            </TableRow>
            {show && (
                <TableRow>
                    <TableCell colSpan={9}>
                        <Collapse in={show}>
                            <Box
                                sx={{
                                    borderRadius: 1,
                                    backgroundColor: theme.palette.primary.lighter,
                                }}
                            >
                                <SmsModalTable
                                    data={[
                                        {content: row.apiKey, name: 'کلید شناسه', isResponse: false},
                                        {content: row.url, name: 'ادرس', isResponse: false},
                                    ]}
                                />
                                <Stack direction={'row'} width={'100%'}>
                                    <Box
                                        sx={{
                                            margin: 1,
                                            padding: 1,
                                            // marginTop: 3,
                                            borderRadius: 1,
                                            bgcolor: 'background.neutral',
                                            width: '100%'
                                        }}
                                    >
                                        <Typography>پاسخ</Typography>
                                        <ReactJson style={{
                                            direction: 'ltr',
                                            textAlign: 'start'
                                        }} src={JSON.parse(row.response || "{}")}
                                                   theme={themeMode === 'light' ? 'rjv-default' : 'twilight'}/>

                                    </Box>
                                    <Box
                                        sx={{
                                            margin: 1,
                                            padding: 1,
                                            // marginTop: 3,
                                            borderRadius: 1,
                                            bgcolor: 'background.neutral',
                                            width: '100%'
                                        }}
                                    >
                                        <Typography>درخواست</Typography>

                                        <ReactJson style={{
                                            direction: 'ltr',
                                            textAlign: 'start'
                                        }} src={JSON.parse(row.request || "{}")}
                                                   theme={themeMode === 'light' ? 'rjv-default' : 'twilight'}/>
                                    </Box>
                                </Stack>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

export default LogSmsReportTableRow;
