const BadgeBlack = ({ text }: { text: string }) => {
  return (
    <div
      className={`bg-black uppercase font-bold text-white text-xs rounded-lg py-1 px-2`}
    >
      {text}
    </div>
  );
};

export default BadgeBlack;
