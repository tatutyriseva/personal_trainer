import React from "react";
import { Inject, ScheduleComponent, Day, Week, Month, Agenda} from '@syncfusion/ej2-react-schedule';


export default function Calendar () {

const [data, setData] = React.useState([{
        id: 1,
        subject: 'Paris',
        startTime: new Date(2020, 8, 15, 10, 0),
        endTime: new Date(2020, 8, 17, 12, 30),
    }])

const click = () => {
        console.log(data);
    }

    return (
        <div>
            <ScheduleComponent eventSettings={data}>

                <Inject services={[Day, Week, Month, Agenda]} />

            </ScheduleComponent>
                    </div>
    )
}

