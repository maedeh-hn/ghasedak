import PropTypes from 'prop-types';
// form
import {useFormContext, Controller} from 'react-hook-form';
// @mui
import {Radio, RadioGroup, FormHelperText, FormControlLabel, Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';

// ----------------------------------------------------------------------

RHFRadioGroup.propTypes = {
    name: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    getOptionLabel: PropTypes.arrayOf(PropTypes.string),
};

export default function RHFRadioGroup({name, disabled, options, getOptionLabel, sx, ...other}) {
    const {control, getValues} = useFormContext();
    const theme = useTheme();

    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState: {error}}) => (
                <div>
                    <RadioGroup {...field} {...other} sx={{
                        flexDirection: 'row',
                    }}>
                        {options.map((option, index) => (
                            <Box key={index} sx={sx}>
                                <FormControlLabel
                                    disabled={index === disabled}
                                    sx={{
                                        borderStyle: 'solid',
                                        borderWidth: '1px',
                                        borderColor:
                                            String(getValues(name)) === String(option) ? theme.palette.primary.main : theme.palette.grey[300],
                                        color:
                                            String(getValues(name)) !== String(option)
                                                ? theme.palette.text.disabled
                                                : theme.palette.text.primary,
                                        paddingRight: 1.5,
                                        borderRadius: '10px',
                                        display: 'flex',
                                        flexDirection: 'unset',
                                        height:'100%',
                                        marginLeft: 0
                                    }}
                                    key={option}
                                    value={option}
                                    control={<Radio />}
                                    label={getOptionLabel?.length ? getOptionLabel[index] : option}
                                />
                            </Box>
                        ))}
                    </RadioGroup>

                    {!!error && (
                        <FormHelperText error sx={{px: 2}}>
                            {error.message}
                        </FormHelperText>
                    )}
                </div>
            )}
        />
    );
}
