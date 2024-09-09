import React from "react";
import Seats from "./Seats";

const EventTitle = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-2 border-b-2 ">
        <h3 className="font-bold text-6xl py-1 text-white">Gamers Connect</h3>
        <p className="text-3xl font-bold">$20 /Ticket</p>
      </div>

      <div className="flex justify-between">
        <div className=" font-extrabold text-white flex flex-col gap-1 text-left">
          <p className="text-md text-white/50">At</p>
          <span className=" capitalize text-3xl">DDN</span>
          <span className=" text-md text-white/50">On</span>

          <p className=" capitalize text-white text-3xl">MONDAY | 9/AUG/2024</p>
        </div>
        {/* <Seats /> */}
      </div>
    </>
  );
};

export default EventTitle;
