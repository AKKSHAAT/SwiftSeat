import Nav from "@/Components/Nav";
import Ticket from "@/Components/Ticket";
import React from "react";

const Index = ({ ticketList }) => {
  return (
    <>
      <Nav />
      {ticketList &&
        ticketList.map((ticket, index) => {
          return (
            <div key={index}>
              <Ticket key={index} ticket={ticket} />
              <hr className="border-t-white/10 pt-5 " />
            </div>
          );
        })}
    </>
  );
};

export default Index;
