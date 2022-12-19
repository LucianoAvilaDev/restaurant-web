const BadgeSuccess = ({ text }: { text: string }) => {
  return (
    <div
      className={`bg-green-600 uppercase font-medium text-white text-xs rounded-lg py-1 px-2`}
    >
      {text}
    </div>
  );
};

export default BadgeSuccess;
