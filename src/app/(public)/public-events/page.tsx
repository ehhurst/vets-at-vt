import DateCard from "@/src/components/events/DateCard";

export default function publicEventsPage() {
    // call to get events for this month
    // const month = Date.UTC
    // console.log(month);
    // const publicEvents = 

    return(
        <div>
            <h1>Upcoming Events</h1>
            <div>
                <h1>Join Us</h1>
                <p>Explore our upcoming events designed to connect, support, or to get involved. </p>
            </div>
            <DateCard/>
        </div>
        

    );
}