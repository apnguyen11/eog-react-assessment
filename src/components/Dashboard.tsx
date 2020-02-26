import React from "react"
import { Card } from "@material-ui/core"
import Weather from '../Features/Weather/Weather';
import Heartbeat from '../Features/Heartbeat/Heartbeat'
import GetMetrics from '../Features/getMetrics/GetMetrics'
import GetLastKnownMeasurements from '../Features/GetLastKnownMeasurement/GetLastKnownMeasurement'
import GetMeasurements from '../Features/GetMeasurements/GetMeasurements'


interface Props {
    // text: string;
}

 export const DashBoard: React.FC<Props> = () => {
    return (
        <div>
           
            <GetMeasurements/>
        </div>
    )
}

