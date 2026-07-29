import {
    Timeline,
    TimelineBody,
    TimelineContent,
    TimelineItem,
    TimelinePoint,
    TimelineTime,
    TimelineTitle,
} from "flowbite-react";
import { IoCheckmarkCircle } from "react-icons/io5";

const ComplaintTimeline = (props) => {

    const date = new Date(props.filed_on);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const filed_on = date.toLocaleDateString('en-US', options);

    console.log(props.stage)

    return (
        <Timeline className="mt-5">
            <TimelineItem>
                <TimelinePoint icon={props.stage >= 0 ? IoCheckmarkCircle : null} />
                <TimelineContent>
                    <TimelineTime>{filed_on}</TimelineTime>
                    <TimelineTitle>Complaint Filed</TimelineTitle>
                    <TimelineBody>Your complaint has been successfully submitted we will update you as soon as possible</TimelineBody>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelinePoint icon={props.stage >= 1 ? IoCheckmarkCircle : null} />
                <TimelineContent>
                    <TimelineTime></TimelineTime>
                    <TimelineTitle>Verified</TimelineTitle>
                    {props.stage >= 1 && <TimelineBody>Your complaint has been verified</TimelineBody>}
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelinePoint icon={props.stage >= 2 ? IoCheckmarkCircle : null} />
                <TimelineContent>
                    <TimelineTime></TimelineTime>
                    <TimelineTitle>Under Investigation</TimelineTitle>
                    {props.stage >= 2 && <TimelineBody>We are investigating your complaint</TimelineBody>}
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelinePoint icon={props.stage >= 4 ? IoCheckmarkCircle : null} />
                <TimelineContent>
                    <TimelineTime></TimelineTime>
                    <TimelineTitle>Resolved</TimelineTitle>
                    {props.stage >= 4 && <TimelineBody>Your complaint has been resolved</TimelineBody>}
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}

export default ComplaintTimeline;