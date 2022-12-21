import { CardType } from "../../../types/CardType";
import { GetStyleByColorNameForCard } from "../../utils/GetStyleByColorNameForCard";

const SmallCard = ({ title, value, footerText, color }: CardType) => {
  let theme: string = GetStyleByColorNameForCard(color);

  return (
    <div
      className={`${theme} flex flex-col p-2 min-w-0 break-words shadow-lg rounded-xl`}
    >
      <div className="flex justify-center p-2 w-full">
        <div title={title} className="flex flex-col space-y-2 w-full">
          <div className="font-sans text-sm truncate font-semibold leading-normal">
            {title}
          </div>
          <div className="font-bold self-end text-2xl">{value}</div>
        </div>
      </div>
      <div className={`w-full border-t border-gray-300 p-1 `}>{footerText}</div>
    </div>
  );
};

export default SmallCard;
