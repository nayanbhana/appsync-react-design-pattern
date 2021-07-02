import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
  logFormTextFieldRoot: {
    backgroundColor: '#fff'
  },
  textField: {
    width: '100%'
  }
});

export default ({
  defaultValue,
  label,
  inputProps,
  multiline,
  params,
  rows,
  type,
  value,
  setValue,
  handleChange
}) => {
  const classes = useStyles();
  return (
    <div className={classes.logFormTextFieldRoot}>
      <TextField
        {...params}
        className={classes.textField}
        defaultValue={defaultValue}
        inputProps={inputProps}
        label={label}
        multiline={multiline}
        rows={rows}
        type={type}
        variant='outlined'
        value={value}
        onChange={e =>
          handleChange ? handleChange(e) : setValue(e.target.value)
        }
      />
    </div>
  );
};
