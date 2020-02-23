import React from "react"
import { Card } from "@material-ui/core"
import Weather from '../Features/Weather/Weather';
import Heartbeat from '../Features/Heartbeat/Heartbeat'


interface Props {
    // text: string;
}

 export const DashBoard: React.FC<Props> = () => {
    return (
        <div>
            <Weather />
            <Heartbeat />
        </div>
    )
}

