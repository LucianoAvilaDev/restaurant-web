import React from "react";
import { ButtonSolid } from "../buttons/ButtonSolid";

type Props = {
  text?: string;
  onClickYes?: Function;
  onClickNo?: Function;
};

const YesNoTemplate = ({ text, onClickYes, onClickNo }: Props) => {
  return (
    <div
      className={`flex flex-col text-center justify-center p-2 text-sm space-y-3 `}
    >
      <div> {text ?? "Deseja realmente excluir este registro?"}</div>
      <div className={`flex font-bold xs:flex-col sm:flex-row space-x-3`}>
        <ButtonSolid
          id={"yes"}
          label={"Confirmar"}
          color={"success"}
          onClick={async () => {
            onClickYes ? await onClickYes() : null;
          }}
        />
        <ButtonSolid
          id={"no"}
          label={"Cancelar"}
          color={"danger"}
          onClick={async () => {
            onClickNo ? await onClickNo() : null;
          }}
        />
      </div>
    </div>
  );
};

export default YesNoTemplate;
