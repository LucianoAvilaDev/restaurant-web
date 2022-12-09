import React from "react";

type Props = {
  text: string;
  url: string;
};

export const Link = ({ text, url }: Props) => {
  return (
    <div className="text-sm">
      <a
        href={url}
        className="font-medium text-cyan-500 focus:text-cyan-700 hover:text-cyan-300"
      >
        {text}
      </a>
    </div>
  );
};
