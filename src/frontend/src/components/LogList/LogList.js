import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
// import { useQuery, useSubscription } from '@apollo/react-hooks';

const styles = {
    logDesktopRoot: {
        marginTop: '30px',
        width: '100%'
      },
  listRoot: {
    backgroundColor: '#fff',
  },
  inline: {
    display: 'inline',
  },
};

class LogList extends Component {
    componentDidMount() {
        this.props.subscribeToNewLogs();
    }
    
  
    render() {
        const { classes, loading, error, data } = this.props
        if (loading) return 'Loading...';
        if (error) return `Error@ ${error.message}`;

        const list = data.getMemberActivity.items.map(log => (
                <React.Fragment>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={log.title}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Date: {log.date}, Logged: {log.hours} hrs
                                </Typography>
                                &nbsp; — {log.notes}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            )
        );

        return (
            <Grid
                container
                className={classes.logDesktopRoot}
                direction='row'
                justify='center'
            >
                <Grid item style={{ width: '70%' }}>
                    <Grid item>
                        <Box color='#414042' fontSize={21} fontWeight='fontWeightBold'>
                            Log list
                        </Box>
                    </Grid>
                    <Grid item>
                        <List className={`${classes.listRoot} ${classes.logDesktopRoot}`}>
                            {list}
                        </List>    
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(LogList);
