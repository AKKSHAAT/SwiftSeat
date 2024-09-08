import React from "react";

const EventTitle = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center mb-10 border-b-2 ">
        <h3 className="font-bold text-6xl py-1 text-white">Gamers Connect</h3>
        <p className="text-3xl font-bold">$20 /Ticket</p>
      </div>

      <div className="mt-auto font-extrabold text-white flex flex-col gap-2 text-left">
        <p className="text-md">At</p>
        <span className=" capitalize text-4xl">DDN</span>
        <span className=" text-md text-white/50">On</span>

        <p className=" capitalize text-white/50 text-4xl">
          MONDAY | 9/AUG/2024
        </p>
      </div>
    </div>
  );
};

export default EventTitle;
