import Nav from "@/Components/Nav";
import React from "react";
import EventTitle from "@/Components/EventTitle";
import Seats from "@/Components/Seats";


const Show = ({event}) => {

  console.log(event);
  return (
    <>
      <Nav />

      <section>
        <div className="relative h-[28vh] overflow-hidden">
          <img
            className="object-cover h-full w-full rounded-xl"
            src="https://picsum.photos/1400"
            alt="Gamers Connect"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black via-black to-transparent"></div>
        </div>

        <EventTitle event={event}/>
        <div className="mt-2">
          <Seats />
        </div>
      </section>
    </>
  );
};

export default Show;
