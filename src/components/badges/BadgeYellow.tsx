const BadgeYellow = ({ text }: { text: string }) => {
  return (
    <div
      className={`bg-amber-300 uppercase font-bold text-black text-xs rounded-lg py-1 px-2`}
    >
      {text}
    </div>
  );
};

export default BadgeYellow;
