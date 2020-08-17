import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core/styles';
import Addcustomer from './Addcustomer';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Customers () {
    const classes = useStyles();
    const [customers, setCustomers] = React.useState([]);

    React.useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))  
    }

    const saveCustomer = (customer) => {
      fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
    }


    const columns = [
          { title: 'Firstname', field: 'firstname' },
          { title: 'Lastname', field: 'lastname' },
          { title: 'Street address', field: 'streetaddress'},
          { title: 'Post code', field: 'postcode' },
          { title: 'City', field: 'city'},
          { title: 'Email', field: 'email'},
          { title: 'Phone', field: 'phone'},
        ]

    return (
        <div>
          <Addcustomer saveCustomer={saveCustomer}/>
          <MaterialTable
            title=""
            columns={columns}
            data={customers}
            editable={{
            onRowUpdate: (newData, oldData) =>
              fetch(oldData.links[1].href, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
              })
              .then(res => fetchData())
              .catch(err => console.error(err)),

            onRowDelete: (oldData) =>
              fetch(oldData.links[1].href, {method: 'DELETE'})
              .then (res => fetchData())
              .catch(err => console.error(err)),
            }}
        />
          </div>
        );
        }

