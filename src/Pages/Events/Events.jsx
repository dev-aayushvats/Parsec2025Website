import ComingSoonCard from "../../Components/ComingSoonCard/ComingSoonCard"
import EventCard from "../../Components/EventCard/EventCard"
import EventsData from "./data5.0"
function Events() {
  return (
    <div className="relative mx-auto max-w-page_lg md:px-8 px-4 pt-32 overflow-x-hidden overflow-y-hidden">
      <div className="font-hero text-center font-semibold text-4xl">Events</div>
      <div className="mt-8">
        {EventsData.map((data, index) => {
          return (
            <EventCard data={data} flipLayout={index % 2 === 1} key={index} />
          )
        })}
        {/* <ComingSoonCard></ComingSoonCard> */}
      </div>
    </div>
  )
}

export default Events
