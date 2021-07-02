import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';
import Contino from '../../assets/contino.png';
import LoadingPug from '../../assets/loadingpug.png';

const useStyles = makeStyles(theme => ({
  loading: {
    bottom: '500px',
    display: 'inline-block',
    height: '10px',
    left: '0px',
    margin: 'auto',
    position: 'fixed',
    right: '0px',
    top: '0px',
    width: '200px'
  }
}));

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#563c82'
  },
  barColorPrimary: {
    backgroundColor: '#151225'
  },
  width: '200px'
})(LinearProgress);

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <img src={Contino} width={200} alt='Contino Logo' />
      <img src={LoadingPug} width={200} height={200} alt='Space Pug' />
      <ColorLinearProgress />
    </div>
  );
};
