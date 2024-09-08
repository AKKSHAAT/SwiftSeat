import React from "react";
import { Link} from "@inertiajs/react";

const AppLink = ({href, text, children}) => {
  return (
    <Link
      className="px-2 hover:text-red translate-colors duration-300"
      href={href}
    >
      {children}
    </Link>
  );
};

export default AppLink;
