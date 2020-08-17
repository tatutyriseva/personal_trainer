import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PeopleIcon from '@material-ui/icons/People';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export default function Nav () {

    const classes = useStyles();

return (
    <div>
        <AppBar position="static">
        <Toolbar>
            <Link to="/customers">
            <Button variant="contained" color="default" className={classes.button} startIcon={<PeopleIcon />}>Customers</Button>
            </Link>
            <Link to="/workouts">
            <Button variant="contained" color="default" className={classes.button}startIcon={<FitnessCenterIcon />}>Workouts</Button>
            </Link>
            <Link to="/calendar">
            <Button variant="contained" color="default" className={classes.button} startIcon={<CalendarTodayIcon />}>Calendar</Button>
            </Link>
        </Toolbar>
        </AppBar>
    </div>
)
}