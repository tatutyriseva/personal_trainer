import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export default function Addcustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firtname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
        })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    const addCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    }

    return (
        <div>
        <Button variant="outlined" color="primary" startIcon={<PersonAddIcon />} style={{margin: 5}} onClick={handleClickOpen}>
            Add new customer
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Customer information</DialogTitle>
            <DialogContent>
            <TextField autofocus margin="dense" name="firstname" label="Firstname" value={customer.firstname} onChange={event => handleInputChange(event)} fullWidth/>
            <TextField margin="dense" name="lastname" label="Lastname" value={customer.lastname} onChange={event => handleInputChange(event)} fullWidth/>
            <TextField margin="dense" name="streetaddress" label="Street Address" value={customer.streetaddress} onChange={event => handleInputChange(event)} fullWidth/>
            <TextField margin="dense" name="postcode" label="Post Code" value={customer.postcode} onChange={event => handleInputChange(event)} fullWidth/>
            <TextField margin="dense" name="city" label="City" value={customer.city} onChange={event => handleInputChange(event)} fullWidth/>
            <TextField margin="dense" name="email" label="Email Address" type="email" value={customer.email} onChange={event => handleInputChange(event)} fullWidth/>
            <TextField margin="dense" name="phone" label="Phone Number" value={customer.phone} onChange={event => handleInputChange(event)} fullWidth/>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={addCustomer} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
    