import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

export default function Addworkout(props) {
    const [open, setOpen] = React.useState(false)

    const [workout, setWorkout] = React.useState({
        date: '', duration: '', activity: '', customer: ''
        })
    
    const [customers, setCustomers] = React.useState([])
    const [customerlist, setCustomerlist] = React.useState([]);

    const classes = useStyles();
    
    const [open2, setOpen2] = React.useState(false);

    const handleClose2 = () => {
        setOpen2(false);
    };

    const handleOpen = () => {
        setOpen2(true);
    };
    
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleInputChange = (event) => {
        setWorkout({...workout, [event.target.name]: event.target.value})
    }

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then (response => response.json())
        .then (data => setCustomers(data.content))
    }

    React.useEffect(() => getCustomers(), [])

    const addWorkout = () => {
        props.saveWorkout(workout);
        handleClose();
    }

    return (
        <div>
        <Button variant="outlined" color="primary" startIcon={<AddCircleIcon />} style={{margin: 5}} onClick={handleClickOpen}>
            Add new workout
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Workout description</DialogTitle>
            <DialogContent>
            <TextField autofocus margin="dense" name="date" label="" value={workout.date} onChange={event => handleInputChange(event)} fullWidth type="datetime-local"/>
            <TextField margin="dense" name="duration" label="Duration (minutes)" value={workout.duration} onChange={event => handleInputChange(event)} type="number" fullWidth/>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Activity</InputLabel>
                <Select labelId="demo-controlled-open-select-label" name="activity" open={open2} onClose={handleClose2} onOpen={handleOpen} value={workout.activity} onChange={event => handleInputChange(event)}>
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value='Fitness'>Fitness</MenuItem>
                <MenuItem value='Spinning'>Spinning</MenuItem>
                <MenuItem value='Gym Training'>Gym Training</MenuItem>
                <MenuItem value='Zumba'>Zumba</MenuItem>
                <MenuItem value='Jogging'>Jogging</MenuItem>
                </Select>
            </FormControl>
            <TextField margin="dense" name="customer" label="Customer" value={workout.customer} onChange={event => handleInputChange(event)} fullWidth/>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={addWorkout} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
    }