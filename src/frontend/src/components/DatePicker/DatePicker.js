import React from 'react';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  datepicker: {
    [theme.breakpoints.up(960)]: {
      marginBottom: '0px'
    },
    marginTop: '0px',
    width: '100%'
  },
  datepickerRoot: {
    backgroundColor: '#fff'
  }
}));

export default ({ label, minDate, maxDate, selectedDate, setSelectedDate }) => {
  const classes = useStyles();
  return (
    <div className={classes.datepickerRoot}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.datepicker}
          format='dd/MM/yyyy'
          inputVariant='outlined'
          KeyboardButtonProps={{ 'aria-label': 'change date' }}
          label={label}
          margin='normal'
          minDate={minDate}
          maxDate={maxDate}
          onChange={date => setSelectedDate(moment(date))}
          value={selectedDate}
          variant='outlined'
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};
