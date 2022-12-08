import React from "react";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div
      className={`flex items-center justify-end px-2 space-x-2 bg-themeMedium h-16 w-full`}
    >
      <UserMenu />
    </div>
  );
};

export default Navbar;
