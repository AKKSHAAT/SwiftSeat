import React from "react";
import { format, parse } from "date-fns";
import Ticket from "./Ticket";

const EventTitle = ({ size = "big", event = {}, amount }) => {
  const formatDate = (dateString) => {
    const date = parse(dateString, "yyyy-MM-dd HH:mm:ss", new Date());
    return format(date, "d/MMM/yyyy").toUpperCase();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-2 border-b-2">
        <h3 className="font-bold text-6xl py-1 text-white truncate w-full max-w-full overflow-hidden">
          {event.name.slice(0,6)}
        </h3>

        <p className="text-3xl font-medium whitespace-nowrap ml-4">₹{amount}</p>
      </div>

      <div className="flex justify-between">
        <div className=" font-extrabold text-white flex flex-col gap-1 text-left">
          <p className="text-md text-white/50">At</p>
          <span className=" capitalize text-3xl text-redw">
            {event.location}
          </span>
          <span className=" text-md text-white/50">On</span>

          <p className=" capitalize text-white text-3xl">
            {event.day} | {formatDate(event.date)}
          </p>
        </div>
      </div>
    </>
  );
};

export default EventTitle;
