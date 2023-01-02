import { CardType } from "../../types/CardType";

const SmallCard = ({ title, value }: CardType) => {
  return (
    <div className="flex justify-center w-full">
      <div
        title={title}
        className={`bg-themeMedium flex-col sm:max-md:flex-row text-white flex border-double border-4 rounded-md p-2  shadow-lg justify-between align-top space-x-2 w-full`}
      >
        <div className="font-sans text-xs sm:text-xs md:text-md truncate font-semibold">
          {title}
        </div>
        <div className="font-bold self-end text-sm sm:text-2xl">{value}</div>
      </div>
    </div>
  );
};

export default SmallCard;
