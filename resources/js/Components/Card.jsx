import React from "react";
import { Link } from "@inertiajs/react";

const Card = ({ size = 'big', event={}}) => {
  console.log('Event:', event);
  
  var classes = 'relative rounded-xl overflow-hidden flex-shrink-0 hover:brightness-[80%] translate duration-300 hover:scale-105';

  if (size === 'big') {
    classes += ' w-full max-w-[24rem] h-[18rem]';
  } if (size === 'small') {
    classes += ' w-full max-w-[18rem] h-[16rem]';
  }

  return (
    <Link href={route('events.show')} className={classes}>
      <img
        className="object-cover h-full w-full"
        src={event?.photo || "https://picsum.photos/600"}
        alt={event?.name || "Event"}
      />
      <div className="absolute bottom-0 left-0 right-0 py-4 px-3 rounded-b-xl bg-gradient-to-t from-black via-black to-transparent hover:py-6 transition-all duration-300 flex justify-between">
        <div id="">
          <div className="font-extrabold text-white flex flex-col text-left w-[10rem]">
            <h3 className="font-bold text-2xl py-1 text-white border-b-2 mb-1">{event.name }</h3>
            <p className="text-md text-white/50">At</p>
            <span className="capitalize text-lg text-red">{event.location || 'Location'}</span>
          </div>
        </div>
        <div className="mt-auto font-extrabold text-red">
          <p>from $20 / ticket</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
