import {FormControlLabel, Switch} from "@mui/material";

const SwitchFilter = ({value, setValue, objKey, label}) => {
  return(
      <FormControlLabel
          control={<Switch size={'small'} value={value} />}
          label={label}
          onChange={(event) =>
              setValue((perv) => ({
                ...perv,
                [objKey]: event.target.checked ? true : '',
              }))
          }
      />
  )
}

export default SwitchFilter;