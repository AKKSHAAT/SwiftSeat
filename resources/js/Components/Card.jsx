import React from "react";
import { Link } from "@inertiajs/react";
const Card = ({size='big'}) => {

  var classes = 'relative rounded-xl  overflow-hidden flex-shrink-0';

  if(size == 'big') {
    classes +=' w-full max-w-[24rem] h-[18rem]';
  } if (size == 'small') {
    classes +=' w-full max-w-[18rem] h-[16rem]';
  }

  return (
    <Link href="/show" className={classes}>
    <img
      className="object-cover h-full w-full"
      src="https://picsum.photos/600"
      alt="Gamers Connect"
    />
    <div className="absolute bottom-0 left-0 right-0 py-4 px-3 rounded-b-xl bg-gradient-to-t from-black via-black to-transparent hover:py-6 transition-all duration-300 flex justify-end">
      <div>
        <h3 className="font-bold text-xl py-1 text-white">Gamers Connect</h3>
        <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="mt-auto font-extrabold text-white">
        <p>$20</p>
      </div>
    </div>
  </Link>
  );
};

export default Card;
