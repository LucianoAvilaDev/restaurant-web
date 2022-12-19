import React from "react";

const BadgeGray = ({ text }: { text: string }) => {
  return (
    <div
      className={`bg-gray-200 uppercase font-bold text-black text-xs rounded-lg py-1 px-2`}
    >
      {text}
    </div>
  );
};

export default BadgeGray;
