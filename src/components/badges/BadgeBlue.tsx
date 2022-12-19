import React from "react";

const BadgeBlue = ({ text }: { text: string }) => {
  return (
    <div
      className={`bg-blue-600 uppercase font-bold text-white text-xs rounded-lg py-1 px-2`}
    >
      {text}
    </div>
  );
};

export default BadgeBlue;
