import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid } from '@material-ui/core';
import logNameAutocompleteList from '../../constants/log';
import AutocompleteTextField from '../AutocompleteTextField/AutocompleteTextField';
import DatePicker from '../DatePicker/DatePicker';
import LogFormTextField from '../LogFormTextField/LogFormTextField';

const useStyles = makeStyles(theme => ({
  logDesktopRoot: {
    marginTop: '30px',
    width: '100%'
  },
  submit: {
    '&:hover': {
      background: '#4598CA 0% 0% no-repeat padding-box'
    },
    background: '#4598CA 0% 0% no-repeat padding-box',
    boxShadow: '0px 5px 12px #0000003D',
    borderRadius: '5px',
    color: '#fff',
    height: '42px',
    opacity: 1,
    width: '186px'
  }
}));

export default ({
  date,
  handleHoursLogged,
  handleSubmitQuickLog,
  hours,
  logName,
  maxDate,
  minDate,
  notes,
  points,
  setDate,
  setHours,
  setLogName,
  setNotes
}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.logDesktopRoot}
      direction='row'
      justify='center'
    >
      <Grid item style={{ width: '70%' }}>
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <Box color='#414042' fontSize={21} fontWeight='fontWeightBold'>
              Quick log
            </Box>
          </Grid>
          <Grid item>
            <AutocompleteTextField
              label='Log Name'
              list={logNameAutocompleteList}
              value={logName}
              setValue={setLogName}
            />
          </Grid>
          <Grid item>
            <Grid
              container
              alignItems='flex-end'
              direction='row'
              justify='space-between'
            >
              <Grid item style={{ width: '40%' }}>
                <DatePicker
                  label='Date'
                  minDate={minDate}
                  maxDate={maxDate}
                  selectedDate={date}
                  setSelectedDate={setDate}
                />
              </Grid>
              <Grid item style={{ width: '30%' }}>
                <LogFormTextField
                  inputProps={{ min: 0.5, max: 15, step: 0.5 }}
                  label='Hours Logged'
                  type='number'
                  value={hours}
                  setValue={setHours}
                  handleChange={handleHoursLogged}
                />
              </Grid>
              <Grid item style={{ width: '20%' }}>
                <Box marginBottom='18px' component='div'>
                  {points} {points && 'point'}
                  {points && points > 1 && 's'}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <LogFormTextField
              label='Notes'
              multiline={true}
              rows={8}
              value={notes}
              setValue={setNotes}
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              className={classes.submit}
              disabled={logName === '' || notes === ''}
              onClick={() => handleSubmitQuickLog()}
            >
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
