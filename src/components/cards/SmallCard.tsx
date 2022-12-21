import { CardType } from "../../../types/CardType";
import { GetStyleByColorNameForCard } from "../../utils/GetStyleByColorNameForCard";

const SmallCard = ({ title, value, footerText, color }: CardType) => {
  let theme: string = GetStyleByColorNameForCard(color);

  return (
    <div className="flex justify-center w-full">
      <div
        title={title}
        className={`${theme} flex border-double border-4 rounded-md p-2  shadow-lg justify-between align-top space-x-2 w-full`}
      >
        <div className="font-sans truncate font-semibold leading-normal">
          {title}
        </div>
        <div className="font-bold self-end text-2xl">{value}</div>
      </div>
    </div>
  );
};

export default SmallCard;
