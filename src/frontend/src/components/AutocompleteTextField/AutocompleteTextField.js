import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles({
  autocompleteTextFieldRoot: {
    backgroundColor: '#fff',
    width: '100%'
  }
});

export default ({ label, list, value, setValue }) => {
  const classes = useStyles();
  return (
    <div className={classes.autocompleteTextFieldRoot}>
      <Autocomplete
        {...list}
        autoComplete
        freeSolo
        includeInputInList
        value={value}
        onChange={(e, value) => setValue(value)}
        onBlur={e => setValue(e.target.value)}
        renderInput={params => (
          <TextField {...params} fullWidth label={label} variant='outlined' />
        )}
      />
    </div>
  );
};
