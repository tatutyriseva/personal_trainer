import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from '@material-ui/core/styles';
import Addworkout from './Addworkout';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Customers () {
    const classes = useStyles();
    const [workouts, setWorkouts] = React.useState([]);

    React.useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setWorkouts(data.content))  
    }

    const saveWorkout = (workout) => {
      fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(workout)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
    }

    const getCustomerInfo = () => {

    }


    const columns = [
          { title: 'Date', field: 'date'},
          { title: 'Duration', field: 'duration' },
          { title: 'Activity', field: 'activity'},
          { title: 'Customer', field: 'links[2].href' },
        ]

    return (
        <div>
          <Addworkout saveWorkout={saveWorkout}/>
          <MaterialTable
            title=""
            columns={columns}
            data={workouts}
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

