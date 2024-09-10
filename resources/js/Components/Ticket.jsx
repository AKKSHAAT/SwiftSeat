import React from "react";
import EventTitle from "./EventTitle";

const Ticket = ({event}) => {

  console.log("event::", event);

  return (
    <>
      <div>
        <div className="max-w-md mx-auto z-10 rounded-3xl">
         <div className="flex flex-col">
            <div className="border-2 relative drop-shadow-2xl  rounded-3xl p-4 m-4">
              <div className="flex-none sm:flex">
                <div className=" relative h-32 w-32   sm:mb-0 mb-3 hidden">
                  <a
                    href="#"
                    className="absolute -right-2 bottom-2   -ml-3  text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300"
                  ></a>
                </div>

                <div className="flex-auto justify-evenly">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center  my-1">
                      <h2 className="font-medium">{"Gamers Connect"}</h2>
                    </div>
                    <div className="ml-auto text-red">{"ID A380"}</div>
                  </div>
                  <div className="border-dashed border-b-2 my-5"></div>
                  <div className="flex items-center">
                    <div className="flex flex-col ">
                      <EventTitle event={event} size="small"/>
                    </div>
                  </div>
                  <div className=" border-dashed border-b-2 my-5 pt-5">
                    <div className="absolute rounded-full w-5 h-5 bg-black -mt-2 -left-2"></div>
                    <div className="absolute rounded-full w-5 h-5 bg-black -mt-2 -right-2"></div>
                  </div>
                  <div className="flex items-center px-5 pt-3 text-sm">

                        <div className="flex flex-col">
                          <span className="">Name</span>
                          <div className="font-semibold">Ajimon</div>
                        </div>
                        <div className="flex flex-col mx-auto">
                          <span className="">VIP</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="">Seat</span>
                          <div className="font-semibold">12 E</div>
                        </div>

                  </div>


                  <div className="flex flex-col py-5  justify-center text-sm ">
                    <h6 className="font-bold text-center">Scan</h6>

                    <div className="barcode h-14 w-0 inline-block mt-4 relative left-auto"></div>
                  </div>



                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
