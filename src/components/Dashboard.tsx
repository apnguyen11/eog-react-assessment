import React from "react"
import { Card } from "@material-ui/core"
import Weather from '../Features/Weather/Weather';
import Heartbeat from '../Features/Heartbeat/Heartbeat'
import GetMetrics from '../Features/getMetrics/GetMetrics'
import GetLastKnownMeasurements from '../Features/GetLastKnownMeasurement/GetLastKnownMeasurement'


interface Props {
    // text: string;
}

 export const DashBoard: React.FC<Props> = () => {
    return (
        <div>
            <Weather />
            <Heartbeat />
            <GetMetrics /> 
            <GetLastKnownMeasurements />
        </div>
    )
}

